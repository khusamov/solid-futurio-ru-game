import {createSourceFile, Node, ScriptTarget, SourceFile, SyntaxKind} from 'typescript'

const source = `
	interface IRegistrator {
		register(): void
	}
`
const sourceFile = createSourceFile('IRegistrator.ts', source, ScriptTarget.ES2015, true)

function printRecursiveFrom(
	node: Node, indentLevel: number, sourceFile: SourceFile
) {
	const indentation = "-".repeat(indentLevel);
	const syntaxKind = SyntaxKind[node.kind];
	const nodeText = node.getText(sourceFile);
	console.log(`${indentation}${syntaxKind}: ${nodeText}`);

	node.forEachChild(child =>
		printRecursiveFrom(child, indentLevel + 1, sourceFile)
	);
}

printRecursiveFrom(sourceFile, 0, sourceFile);

