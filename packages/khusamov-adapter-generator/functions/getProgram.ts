import {join, resolve} from 'path';
import getCompilerOptions from './getCompilerOptions';
import {createCompilerHost, createProgram} from 'typescript';

// Чтобы работал getJSDocTags нужно включать setParentNodes = true.
// Подробности см. https://github.com/microsoft/TypeScript/issues/7393#issuecomment-425525334
const setParentNodes = true

/**
 * Получить экземпляр класса Program из TypeScript Compiler API.
 * @param projectPath Абсолютный путь к директории проекта.
 * @param projectIndexFilename Путь к файлу index.ts относительно projectPath.
 */
export default function getProgram(projectPath: string, projectIndexFilename: string) {
	projectIndexFilename = join(projectPath, projectIndexFilename)
	const compilerOptions = getCompilerOptions(projectPath);
	const compilerHost = createCompilerHost(compilerOptions, setParentNodes)
	return createProgram([projectIndexFilename], compilerOptions, compilerHost);
}