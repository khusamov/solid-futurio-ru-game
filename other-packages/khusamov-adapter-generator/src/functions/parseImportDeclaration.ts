import {
	ImportDeclaration,
	isIdentifier,
	Identifier,
	Expression,
	factory,
	ImportClause,
	StringLiteralLike,
	PropertySignature,
	isImportDeclaration
} from 'typescript'
import filterNodes from './filterNodes';

export enum EImportType {
	Default = 'default',
	Named = 'named'
}

export interface IImportInfo {
	/**
	 * Имя импортированного элемента.
	 */
	identifier: Identifier

	/**
	 * Тип импорта: по умолчанию или именнованный.
	 */
	type: EImportType

	/**
	 * Источник импорта (имя пакета или путь к файлу).
	 */
	moduleSpecifier: Expression

	/**
	 * Определение импорта только для данного элемента.
	 */
	importDeclaration: ImportDeclaration
}

/**
 * Разбор определения импорта на составляющие:
 * - импорт по умолчанию
 * - именнованные импорты
 * - импорты с переименованием (пока не реализовано)
 * @param importDeclaration
 */
export default function parseImportDeclaration(importDeclaration: ImportDeclaration): IImportInfo[] {
	const result: IImportInfo[] = []
	const importClause = importDeclaration.importClause
	if (importClause) {
		const identifiers = filterNodes(importClause, isIdentifier)
		for (const identifier of identifiers) {
			const type = identifier.parent === importClause ? EImportType.Default : EImportType.Named
			result.push({
				identifier,
				type,
				moduleSpecifier: importDeclaration.moduleSpecifier,
				importDeclaration: createImportDeclaration(type, identifier, importDeclaration)
			})
		}
	}
	return result
}

function createImportDeclaration(type: EImportType, identifier: Identifier, importDeclaration: ImportDeclaration) {
	let importClause: ImportClause
	switch (type) {
		case EImportType.Default:
			importClause = factory.createImportClause(false, identifier, undefined)
			break;
		case EImportType.Named:
			const namedImports = factory.createNamedImports([factory.createImportSpecifier(false, undefined, identifier)])
			importClause = factory.createImportClause(false, undefined, namedImports)
			break;
	}
	return (
		factory.createImportDeclaration(
			undefined,
			undefined,
			importClause,
			// Создание moduleSpecifier взято отсюда:
			// https://github.com/microsoft/TypeScript/blob/main/src/services/refactors/moveToNewFile.ts#L199
			factory.createStringLiteral((importDeclaration.moduleSpecifier as StringLiteralLike).text, true)
		)
	)
}

export function removeImportInfoDuplicates(importInfoList: Array<IImportInfo | undefined>): IImportInfo[] {
	const uniqueMap = new Map
	for (const importInfo of importInfoList) {
		if (importInfo) {
			uniqueMap.set(importInfo.identifier.text, importInfo)
		}
	}
	return Array.from(uniqueMap.values())
}

export function getImportInfoFromPropertySignature(propertySignature: PropertySignature) {
	const typeName = propertySignature.type?.getText()
	const sourceFile = propertySignature.type?.getSourceFile()
	if (typeName && sourceFile) {
		const importDeclarations = sourceFile.statements.filter(isImportDeclaration)
		for (const importDeclaration of importDeclarations) {
			const importInfoList = parseImportDeclaration(importDeclaration)
			const importInfo = importInfoList.find(importInfo => importInfo.identifier.text === typeName)
			if (importInfo) {
				return importInfo
			}
		}
	}
}