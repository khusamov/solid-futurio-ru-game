Генератор адаптеров
===================

Идея данного генератора адаптера заключается в том, чтобы не быть зависимым 
от разработчиков библиотек с рефлексией для TypeScript. Данные библиотеки еще на стадии разработки
и нет стабильных версий. 

Более менее продуманная и поддерживаемая библиотека это `typescript-rtti`. Но у нее есть недостатки:
1. альфа-версия (есть не исправленные ошибки)
2. нет поддержки таких сборщиков как `parcel` и `esbuild` (потому что в них реализована 
   по-файловая компиляция TypeScript-кода)
3. в сборщик требуется встраивать ttypescript и трасформер, что влечеет за собой неопределенные риски
   
Данный генератор адаптера создает файлы с классами адаптеров до компиляции и сборки проекта. 
На его вход требуется подать путь к интерфейсам и путь, куда сохранить готовые адаптеры.
В итоге, после создания нового интерфейса или изменении существующего следует заново запустить данный генератор.

У данного генератора есть преимущество: он не влияет на производительность программы, так как
генерация происходит не на лету во время исполнения программы, а до компиляции и сборки.
Также можно выполнять отладку адаптеров.

Сейчас генератор не написан.

Текущее состояние проекта
-------------------------

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