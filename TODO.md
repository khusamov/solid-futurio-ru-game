TODO
====

Перейти на parcel.

В пакете khusamov-base-types разделить классы и интерфейсы по отдельным папкам.

Удалить Адаптеры у всех приказов и избавиться от IUniversalObject для представления приказов.
Подумать - может Команда и Приказ должны быть всегда вместе?
Если да - то избавиться от пакета khusamov-command-order-system

Свойство `targetObject` в классах `StartCommand` и `StopCommand` заменить с `IUniversalObject` на `IWithStoppable`.

Файлы
htmlTemplate.js
RollupConfigGenerator.js
перенести в пакет:
khusamov-rollup-config

Файлы 
tsconfig.base.json
перенести в отдельную папку

Попробовать раскрыть workspaces в файле package.json - вроде тогда будет компилироваться в нужном порядке.
--topological вроде себя не оправдал?

Упростить классы:
Queue
Shortcut
Timer

Пакет khusamov-format-code перенести на https://khusamov.github.io/ в виде статьи.

А нужен ли класс UniversalObject?
---------------------------------

Надо подумать о целесообразности пакета khusamov-universal-object.
Дело в том, что класса UniversalObject можно использовать обычный object из JavaScript.
В этом случае отпадает необходимость в адаптерах.

```typescript
interface IGameObject {
	type: string
    name: string
}

interface IMovable {
	position: Vector
	linearVelocity: Vector
}

const spaceship: IGameObject & IMovable = {
	type: 'ship',
    name: 'theSpaceship',
	position: new Vector,
    linearVelocity: new Vector
}

const gameObjectList: Record<string, any> = []

gameObjectList.push(spaceship)

const gameObject = gameObjectList.find<IGameObject>(gameObject => gameObject.name === 'theSpaceship')
if (gameObject) {
	const movable = gameObject as IMovable
}
```