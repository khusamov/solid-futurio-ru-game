import {resolve} from 'path'
import {
	getJSDocTags,
	isPropertySignature,
	SyntaxKind,
	factory, NodeFlags, createPrinter, EmitHint, Statement, ClassElement
} from 'typescript'
import getProgram from './functions/getProgram';
import getInterfaceDeclarations from './functions/getInterfaceDeclarations';
import adapterFactory from './factory/adapterFactory';
import getComment from './functions/getComment';
import {getImportInfoFromPropertySignature, removeImportInfoDuplicates} from './functions/parseImportDeclaration';
import {formatCode} from 'khusamov-format-code';

// Загрузка проекта в память.
const projectPath = resolve('../../', 'packages/khusamov-game-command-system')
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

