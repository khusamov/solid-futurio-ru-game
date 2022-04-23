import {
	getJSDocTags, isPropertySignature, SyntaxKind,
	factory, NodeFlags, createPrinter, EmitHint, Statement, ClassElement
} from 'typescript'
import {formatCode} from 'khusamov-format-code';
import adapterFactory from '../factory/adapterFactory';
import getProgram from './getProgram';
import getComment from './getComment';
import getInterfaceDeclarations from './getInterfaceDeclarations';
import {getImportInfoFromPropertySignature, removeImportInfoDuplicates} from './parseImportDeclaration';
import {createConstructorImportDeclaration} from '../factory/adapterFactory/createConstructorDeclaration';

/**
 * На вход подается абсолютный путь к директории TypeScript-проекта, в котором есть файл tsconfig.json.
 * Предполагается что в проекте есть входной файл 'src/index.ts'.
 * На выходе возвращается массив с абсолютными путями адаптеров для сохранения и тексты классов адаптеров.
 * @param projectPath
 */
export default function generateProjectAdapters(projectPath: string) {
	// Загрузка проекта в память.
	const program = getProgram(projectPath, 'src/index.ts')
	const projectSourceFiles = program.getSourceFiles().filter(sourceFile => sourceFile.fileName.startsWith(projectPath))
	const foundInterfaceDeclarations = getInterfaceDeclarations(projectSourceFiles)

	// Получение всех интерфейсов, помеченных тегами adaptable в JSDoc-блоках.
	const adaptableInterfaceDeclarations = (
		foundInterfaceDeclarations.filter(interfaceDeclaration => {
			return !!getJSDocTags(interfaceDeclaration).find(tag => tag.tagName.text === 'adaptable')
		})
	)

	// Получение списка файлов с исходниками классов адаптеров и путей для сохранения.
	const adapterInfoList = (
		adaptableInterfaceDeclarations.map(interfaceDeclaration => {
			const statements: Statement[] = []

			const propertySignatures = interfaceDeclaration.members.filter(isPropertySignature)

			// Импорт параметров конструктора Адаптера.
			statements.push(...createConstructorImportDeclaration())

			// Импорты типов свойств интерфейса.
			const importInfoList = removeImportInfoDuplicates(propertySignatures.map(getImportInfoFromPropertySignature))
			for (const importInfo of importInfoList) {
				if (importInfo) {
					statements.push(importInfo.importDeclaration)
				}
			}

			// Комментарий к классу.
			const comment = getComment(interfaceDeclaration.name, program)
			if (comment) {
				statements.push(factory.createJSDocComment(comment) as Statement)
			}

			// Определение класса.
			statements.push(
				adapterFactory.createClassDeclaration(
					interfaceDeclaration,
					propertySignatures.reduce<ClassElement[]>((result, propertySignature) => {
						const comment = getComment(propertySignature.name, program)
						if (comment) {
							result.push(factory.createJSDocComment(comment) as ClassElement)
						}
						result.push(adapterFactory.createGetAccessorDeclaration(propertySignature))
						result.push(adapterFactory.createSetAccessorDeclaration(propertySignature))
						return result
					}, [])
				)
			)
			return {
				fileName: adapterFactory.getAdapterFilename(interfaceDeclaration),
				sourceFile: (
					factory.createSourceFile(
						statements,
						factory.createToken(SyntaxKind.EndOfFileToken),
						NodeFlags.None
					)
				)
			}
		})
	)

	for (const adapterInfo of adapterInfoList) {
		console.log('Путь к файлу:', adapterInfo.fileName.replace(projectPath, ''))
		console.log(
			formatCode(
				createPrinter({omitTrailingSemicolon: true})
					.printNode(
						EmitHint.Unspecified,
						adapterInfo.sourceFile,
						adapterInfo.sourceFile
					)
			)
		)
	}

	return adapterInfoList.map(adapterInfo => ({
		filename: adapterInfo.fileName,
		sourceFile: adapterInfo.sourceFile,
		sourceText: (
			formatCode(
				createPrinter({omitTrailingSemicolon: true})
					.printNode(
						EmitHint.Unspecified,
						adapterInfo.sourceFile,
						adapterInfo.sourceFile
					)
			)
		)
	}))
}