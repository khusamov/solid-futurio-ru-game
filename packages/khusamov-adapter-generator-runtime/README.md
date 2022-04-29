Генератор адаптера для универсального объекта
=============================================

Специальная функция, которая на основе любого интерфейса генерирует класс `Adapter` для извлечения 
свойств из объектов, реализующих интерфейс `IUniversalObject`:

```typescript
interface IUniversalObject {
	getValue<T>(name: string): T
	setValue<T>(name: string, value: T): void
}
```

В объектах `IUniversalObject` могут хранится много свойств разных типов. 
В разных местах программы могут понадобиться тот или иной набор этих свойств. Причем со статический типизацией.
Для этого следует создать интерфейс с именами и типами требуемых свойств и создать адаптер. Адаптер сгенерирует
объект с запрошенными посредством интерфейса свойствами.

Пример использования:
---------------------

```typescript
import {reflect} from 'typescript-rtti'
import {adapterGeneratorResolver} from './adapterGenerator';
import UniversalObject from './object/UniversalObject';
import IUniversalObject from '../types/IUniversalObject';

const iocContainer = new IoC()
iocContainer.resolve<IRegistrator>('Registrator', 'Adapter', adapterGeneratorResolver).register()

interface IMovable {
	position: number
	readonly movementVelocity: string
}

const universalObject: IUniversalObject = new UniversalObject()
const movableAdapter = iocContainer.resolve<IMovable>('Adapter', universalObject, reflect<IMovable>())
movableAdapter.position = 100
```

Пример генерируемого кода адаптера:
-----------------------------------

Вот так выглядит адаптер для интерфейса `IMovable`:

```typescript
class MovableAdapter {
	constructor(universalObject, iocContainer) {
		this.universalObject = universalObject;
	}

	get position() {
		return this.universalObject.getValue('position');
	}

	set position(value) {
		this.universalObject.setValue('position');
	}

	get movementVelocity() {
		return this.universalObject.getValue('movementVelocity');
	}

	set movementVelocity(value) {
		this.universalObject.setValue('movementVelocity');
	}
}
```