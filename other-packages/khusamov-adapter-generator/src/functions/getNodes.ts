import {forEachChild, InterfaceDeclaration, Node, SourceFile, SyntaxKind} from 'typescript';

/**
 * Вполне возможно, что вместо getNodes() можно использовать ts.visitNode(rootNode, visit),
 * где visit это function visit(node: ts.Node): ts.Node
 * @link https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/#walking-the-ast-and-replacing-nodes-using-a-transformer
 * @param node
 */
export default function getNodes(node: Node): Node[] {
	const result: Node[] = []
	forEachChild(node, child => {
		result.push(child, ...getNodes(child))
	})
	return result
}


// Старый способ искать узлы по их типам kind

// interface ISourceFileInterfaces {
// 	sourceFile: SourceFile,
// 	interfaceNodes: InterfaceDeclaration[]
// }
//
//
//
//
// const sourceFileInterfaceInfoList: ISourceFileInterfaces[] = []
// for (const sourceFile of projectSourceFiles) {
// 	const nodes = getNodes(sourceFile)
// 	sourceFileInterfaceInfoList.push({
// 		sourceFile,
// 		interfaceNodes: nodes.filter(node => node.kind === SyntaxKind.InterfaceDeclaration) as InterfaceDeclaration[]
// 	})
// }
//
//
// const interfaceList: { sourceFile: SourceFile, name: string, file: string, interfaceDeclaration: InterfaceDeclaration }[] = []
// sourceFileInterfaceInfoList.map(sourceFileInterfaces => {
// 	for (const interfaceNode of sourceFileInterfaces.interfaceNodes) {
// 		interfaceList.push({
// 			sourceFile: sourceFileInterfaces.sourceFile,
// 			file: sourceFileInterfaces.sourceFile.fileName.replace(projectPath + '/', ''),
// 			name: interfaceNode.name.escapedText.toString(),
// 			interfaceDeclaration: interfaceNode
// 		})
// 	}
// })