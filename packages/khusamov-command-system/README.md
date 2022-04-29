Система команд
==============

Команда это объект с методом `execute()`:

```typescript
const command: ICommand = {
	execute() {
		// action
    }
}
```

Приказ
------

Приказ это объект, на основе которого создается команда.

Приказ (а точнее все вложенные в него объекты) должен быть удовлетворять требованиям сериализации/десериализации,
чтобы была возможность получать их из любого источника.

```typescript
interface IOrder {
	type: string
}

interface IStopOrder extends IOrder {
	commandName: string
    gameObject: {
		type: string
		name: string
	}
}

const stopOrder: IStopOrder = {
	type: 'StopCommand',
	commandName: 'IncreaseForce',
    gameObject: {
		type: 'GameObject',
		name: 'theSpaceship'
    }
}
```

Команды создаются при помощи специальных функций, которые регистрируются как зависимости:

```typescript
import {register} from 'khusamov-inversion-of-control'
import {IUniversalObject} from 'khusamov-universal-object'

function createStopCommandByOrder(stopOrder: IStopOrder): StopCommand {
	const gameObject = resolve<IUniversalObject>(stopOrder.gameObject.type, stopOrder.gameObject)
	return new StopCommand(commandName.gameObject, gameObject)
}

register('StopCommand', createStopCommandByOrder)
```

Предполагается, что создается бесконечный цикл, в котором приказы извлекаются из какого-либо источника.
Например из очереди приказов. Потом на основе приказа создается команда. И созданная команда
отправляется куда-либо еще, например размещается в очереди команд.

Таким образом можно создавать разные форматы приказов и создавать разные конструкторы команд.