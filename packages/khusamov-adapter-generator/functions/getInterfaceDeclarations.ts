import {InterfaceDeclaration, isInterfaceDeclaration, Program, SourceFile} from 'typescript';

/**
 * Еще один вариант как искать узлы:
 * const funcDec = testSourceFile.statements.find(ts.isFunctionDeclaration)!;
 * @link https://github.com/microsoft/TypeScript/blob/main/src/testRunner/unittests/publicApi.ts#L72
 */
export default function getInterfaceDeclarations(sourceFiles: SourceFile[]): InterfaceDeclaration[] {
	const foundInterfaceDeclaration: InterfaceDeclaration[] = []
	for (const sourceFile of sourceFiles) {
		foundInterfaceDeclaration.push(...sourceFile.statements.filter(isInterfaceDeclaration))
	}
	return foundInterfaceDeclaration
}