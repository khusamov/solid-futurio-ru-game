import {resolve} from 'path'
import {readdir, stat} from 'fs/promises'
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
import {program as commanderProgram} from 'commander'

if (require.main === module) {
	generate()
}

export async function generate() {
	interface IOptions{
		directoryOfProjects: string
	}
	commanderProgram.option('--directory-of-projects <char>', 'Директория, где каждая папка есть TS-проект', 'packages')
	commanderProgram.parse()
	const options = commanderProgram.opts<IOptions>()

	const isDirectory = async (item: string) => (await stat(resolve(options.directoryOfProjects, item))).isDirectory()
	const projectDirectories = (
		(await Promise.all(
			(await readdir(resolve(options.directoryOfProjects)))
				.map(async (item) => (await isDirectory(item)) ? item : null)
		))
			.filter((item): item is string => item !== null)
	)

	for (const projectDirectory of projectDirectories) {
		console.log('- - - - - - - - - - - - - - - - - - - - - - - - - -')
		console.log('Генерация адаптеров для проекта:', projectDirectory)
		generateForProject(resolve(options.directoryOfProjects, projectDirectory))
	}
}

function generateForProject(projectPath: string) {
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
}