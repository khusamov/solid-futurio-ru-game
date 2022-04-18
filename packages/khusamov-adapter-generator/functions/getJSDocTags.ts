import {InterfaceDeclaration, Program} from 'typescript';

/**
 * Этот способ работает вне завимости от значения опции setParentNodes.
 * @link https://github.com/microsoft/TypeScript/issues/13498
 * Но проще использовать getJSDocTags(). Но придется выставить setParentNodes = true.
 * @link https://github.com/microsoft/TypeScript/issues/7393#issuecomment-425525334
 * @param program
 * @param interfaceDeclaration
 */
export default function getJSDocTags(program: Program, interfaceDeclaration: InterfaceDeclaration) {
	const checker = program.getTypeChecker()
	const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name)
	if (symbol) {
		return symbol.getJsDocTags() // Вернет [ { name: 'adaptable', text: [ [Object] ] } ].
	}
}