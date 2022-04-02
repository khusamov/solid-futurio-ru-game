Генератор адаптеров
===================

На данный момент написан набросок создания текста класса:

```typescript
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
```

Выводит такой текст:

```typescript
class MovableAdapter {
    constructor() { }
}
```

Ссылки по теме:
---------------

https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api#programmatically-creating-ast-nodes  
https://github.com/microsoft/TypeScript/blob/main/src/testRunner/unittests/printer.ts  
https://yandex.ru/search/?text=typescript+factory.createClassDeclaration&lr=161407&clid=2063712&noreask=1&nomisspell=1  
https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API  