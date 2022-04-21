import {TypeReferenceNode, Program} from 'typescript';

/**
 * Получить путь к файлу, где определен искомый тип.
 * @param typeReferenceNode
 * @param program
 */
export default function getDeclarationFilename(typeReferenceNode: TypeReferenceNode, program: Program) {
	const checker = program.getTypeChecker()
	const type = checker.getTypeAtLocation(typeReferenceNode)
	console.log('aliasSymbol=', type.symbol.escapedName)
	if (type.symbol.declarations) {
		type.symbol.declarations.map(declaration => {
			return declaration.getSourceFile().fileName
		})
	}
}