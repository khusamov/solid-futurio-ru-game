TODO
====

Удалить Адаптеры у всех приказов и избавиться от IUniversalObject для представления приказов.
Подумать - может Команда и Приказ должны быть всегда вместе?
Если да - то избавиться от пакета khusamov-command-order-system

Удалить khusamov-format-code.

Следующие пакеты удалить и перенести в отдельную директорию:
khusamov-adapter-generator
khusamov-adapter-generator-runtime
khusamov-rollup-config
Эти пакеты ценные, но в данном проекте уже не используются. Надо подумать куда их вообще деть.

Перейти на parcel.

От rtti избавиться окончательно.

Свойство `targetObject` в классах `StartCommand` и `StopCommand` заменить с `IUniversalObject` на `IWithStoppable`.

В пакете khusamov-base-types разделить классы и интерфейсы по отдельным папкам.

Попробовать раскрыть workspaces в файле package.json - вроде тогда будет компилироваться в нужном порядке.
--topological вроде себя не оправдал?

Файлы
htmlTemplate.js
RollupConfigGenerator.js
перенести в пакет:
khusamov-rollup-config

Файлы 
tsconfig.base.json
tsconfig.rtti.json
перенести в отдельную папку

Упростить классы:
Queue
Shortcut
Timer

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