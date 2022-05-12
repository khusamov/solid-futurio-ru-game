import {convertCompilerOptionsFromJson, findConfigFile, formatDiagnostic, formatDiagnostics, readConfigFile, sys} from 'typescript';

const formatHost = {
	getCanonicalFileName: (path: string) => path,
	getCurrentDirectory: sys.getCurrentDirectory,
	getNewLine: () => sys.newLine,
}

export default function getCompilerOptions(fileSearchPath: string) {
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