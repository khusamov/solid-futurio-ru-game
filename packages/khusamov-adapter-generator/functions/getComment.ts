import {Program, Node, displayPartsToString} from 'typescript';

/**
 * Весьма странный способ получить описание к классу или интерфейсу.
 * Причем в node нужно передавать не `Declaration`, а `Declaration.name`.
 * @param node
 * @param program
 */
export default function getComment(node: Node, program: Program) {
	const checker = program.getTypeChecker()
	const symbol = checker.getSymbolAtLocation(node)
	if (symbol) {
		const comments = symbol.getDocumentationComment(undefined)
		return displayPartsToString(comments)
	}
}