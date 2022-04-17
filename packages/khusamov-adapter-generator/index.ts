import {createPrinter, EmitHint, factory, NodeFlags, SyntaxKind} from 'typescript'

function createAdapterClassDeclaration(className: string) {
	return factory.createClassDeclaration([], [], className, [], [],
		[
			factory.createConstructorDeclaration([], [], [],
				factory.createBlock([])
			)
		]
	)
}

const movableAdapterSourceFile = factory.createSourceFile(
	[createAdapterClassDeclaration('MovableAdapter')],
	factory.createToken(SyntaxKind.EndOfFileToken),
	NodeFlags.None
)

console.log(
	createPrinter()
		.printNode(
			EmitHint.Unspecified,
			movableAdapterSourceFile,
			movableAdapterSourceFile
		)
)