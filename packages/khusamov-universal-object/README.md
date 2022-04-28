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