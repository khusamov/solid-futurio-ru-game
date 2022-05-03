Универсальный объект
====================

Это что-то вроде базы данных в виде ключ/значение.

Создание объектов
-----------------

```typescript
import {UniversalObject} from 'khusamov-universal-object'

const universalObject = new UniversalObject

universalObject.setValue<string>('name', 'Аврора')

console.log(universalObject.getValue<string>('name')) // Аврора
console.log(universalObject.items) // [{key: 'name', value: 'Аврора'}]
```

Создание объектов при помощи createUniversalObject()
----------------------------------------------------

```typescript
import {UniversalObject, createUniversalObject} from 'khusamov-universal-object'

interface IShip {
	name: string
}

const ship = createUniversalObject<IShip>({name: 'Аврора'})
```

```typescript
import {Vector} from 'khusamov-base-types'
import {UniversalObject, createUniversalObject} from 'khusamov-universal-object'

interface IGameObject {
	name: string
    kind: string[]
}

interface IMovable {
	mass: number
    velocity: Vector
}

const spaceship = createUniversalObject<IGameObject & IMovable>({name: 'Deadstar', mass: 1000})
```

Поиск объектов по совпадению одного из признаков
------------------------------------------------

```typescript
import {UniversalObject, IUniversalObject, findUniversalObject} from 'khusamov-universal-object'

interface IShip {
	name: string
}

const universalObjectList: IUniversalObject[] = []
universalObjectList.push(createUniversalObject<IShip>({name: 'Аврора'}))

const ship = findUniversalObject<IShip>(universalObjectList, {name: 'Аврора'})
```