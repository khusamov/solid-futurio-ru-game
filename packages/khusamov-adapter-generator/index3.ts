import {join, resolve} from 'path'
import {
	isJSDoc,
	JSDoc,
	getAllJSDocTags,
	Identifier,
	convertCompilerOptionsFromJson,
	createCompilerHost,
	createProgram,
	findConfigFile,
	forEachChild,
	formatDiagnostic,
	formatDiagnostics,
	InterfaceDeclaration,
	Node,
	readConfigFile,
	SourceFile,
	SyntaxKind,
	sys, getJSDocTags
} from 'typescript'

const formatHost = {
	getCanonicalFileName: (path: string) => path,
	getCurrentDirectory: sys.getCurrentDirectory,
	getNewLine: () => sys.newLine,
};

function getCompilerOptions(fileSearchPath: string) {
	const configPath = findConfigFile(fileSearchPath, sys.fileExists, 'tsconfig.json')
	if (!configPath) throw new Error(`Не найден 'tsconfig.json' конфиг в директории '${fileSearchPath}'`)
	const readConfigFileResult = readConfigFile(configPath, sys.readFile)
	if (readConfigFileResult.error) {
		throw new Error(formatDiagnostic(readConfigFileResult.error, formatHost))
	}
	const jsonConfig = readConfigFileResult.config
	const convertResult = convertCompilerOptionsFromJson(jsonConfig.compilerOptions, './')
	if (convertResult.errors && convertResult.errors.length > 0) {
		throw new Error(formatDiagnostics(convertResult.errors, formatHost))
	}
	return convertResult.options
}

const projectPath = resolve('../../', 'packages/khusamov-game-command-system')
const projectIndexFilename = join(projectPath, 'src/index.ts')

const compilerOptions = getCompilerOptions(projectPath);
const compilerHost = createCompilerHost(compilerOptions, true) // Чтобы работал getJSDocTags нужно включать true
const program = createProgram([projectIndexFilename], compilerOptions, compilerHost);
const sourceFiles = program.getSourceFiles()

const projectSourceFiles = (
	program
		.getSourceFiles()
		.filter(sourceFile => sourceFile.fileName.startsWith(projectPath))
)


interface ISourceFileInterfaces {
	sourceFile: SourceFile,
	interfaceNodes: InterfaceDeclaration[]
}

function getNodes(node: Node): Node[] {
	const result: Node[] = []
	forEachChild(node, child => {
		result.push(child, ...getNodes(child))
	})
	return result
}

const sourceFileInterfaceInfoList: ISourceFileInterfaces[] = []
for (const sourceFile of projectSourceFiles) {
	const nodes = getNodes(sourceFile)
	sourceFileInterfaceInfoList.push({
		sourceFile,
		interfaceNodes: nodes.filter(node => node.kind === SyntaxKind.InterfaceDeclaration) as InterfaceDeclaration[]
	})
}


const interfaceList: { sourceFile: SourceFile, name: string, file: string, interfaceDeclaration: InterfaceDeclaration }[] = []
sourceFileInterfaceInfoList.map(sourceFileInterfaces => {
	for (const interfaceNode of sourceFileInterfaces.interfaceNodes) {
		interfaceList.push({
			sourceFile: sourceFileInterfaces.sourceFile,
			file: sourceFileInterfaces.sourceFile.fileName.replace(projectPath + '/', ''),
			name: interfaceNode.name.escapedText.toString(),
			interfaceDeclaration: interfaceNode
		})
	}
})



console.log('Интерфейсы:', interfaceList)

// Получение JSDoc-тегов.
const movableInterfaceInfo = interfaceList.find(item => item.name === 'IMovable')
if (movableInterfaceInfo) {
	// https://github.com/microsoft/TypeScript/issues/7393#issuecomment-425525334
	console.log(
		'getJSDocTags(movableInterfaceInfo.interfaceDeclaration)',
		getJSDocTags(movableInterfaceInfo.interfaceDeclaration)[0].tagName.escapedText
	)
	// https://github.com/microsoft/TypeScript/issues/13498
	const checker = program.getTypeChecker()
	const symbol = checker.getSymbolAtLocation(movableInterfaceInfo.interfaceDeclaration.name)
	if (symbol) {
		console.log(symbol.getJsDocTags())
	}
}
