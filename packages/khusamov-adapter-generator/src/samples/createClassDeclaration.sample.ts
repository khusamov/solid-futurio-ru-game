import {createPrinter, EmitHint, factory, NodeFlags, SyntaxKind} from 'typescript'

const importIMovable = factory.createImportDeclaration(
	[], [],
	factory.createImportClause(false, factory.createIdentifier('IMovable'), undefined),
	factory.createStringLiteral('./IMovable', true)
)

const importUniversalObject = factory.createImportDeclaration(
	[], [],
	factory.createImportClause(false, factory.createIdentifier('UniversalObject'), undefined),
	factory.createStringLiteral('./UniversalObject', true)
)

const IMovable = factory.createInterfaceDeclaration([], [], 'IMovable', [], [], [])

const MovableAdapter = factory.createClassDeclaration(
	[],
	[
		factory.createModifier(SyntaxKind.ExportKeyword),
		factory.createModifier(SyntaxKind.DefaultKeyword)
	],
	'MovableAdapter',
	[],
	[
		factory.createHeritageClause(
			SyntaxKind.ImplementsKeyword,
			[factory.createExpressionWithTypeArguments(factory.createIdentifier(IMovable.name.text), undefined)]
		)
	],
	[
		factory.createConstructorDeclaration([], [], [
				factory.createParameterDeclaration(
					[], [factory.createModifier(SyntaxKind.PrivateKeyword)],
					undefined, 'universalObject', undefined,
					factory.createTypeReferenceNode('UniversalObject')
				)
			],
			factory.createBlock([])
		),
		factory.createGetAccessorDeclaration(
			[], [], 'param1', [],
			factory.createKeywordTypeNode(SyntaxKind.StringKeyword),
			factory.createBlock([
				factory.createReturnStatement(
					factory.createCallExpression(
						factory.createPropertyAccessExpression(
							factory.createPropertyAccessExpression(
								factory.createThis(),
								'universalObject'
							),
							'getValue'
						),
						[factory.createKeywordTypeNode(SyntaxKind.StringKeyword)],
						[factory.createStringLiteral('param1', true)]
					)
				)
			])
		)
	]
)

const movableAdapterSourceFile = factory.createSourceFile(
	[importIMovable, importUniversalObject, IMovable, MovableAdapter],
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


// export type ModifierSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.ConstKeyword |
// 	SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.ExportKeyword | SyntaxKind.PrivateKeyword |
// 	SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OverrideKeyword |
// 	SyntaxKind.StaticKeyword;
