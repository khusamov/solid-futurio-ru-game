import {createPrinter, EmitHint, factory, NodeFlags, SyntaxKind} from 'typescript'

const sourceFile2 = factory.createSourceFile([
	factory.createClassDeclaration([], [], 'MovableAdapter', [], [],
		[
			factory.createConstructorDeclaration([], [], [],
				factory.createBlock([])
			)
		]
	)
], factory.createToken(SyntaxKind.EndOfFileToken), NodeFlags.None)

console.log(
	createPrinter().printNode(EmitHint.Unspecified, sourceFile2, sourceFile2)
)