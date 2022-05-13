TODO
====

Привести пакет khusamov-game в стабильное состояние. После перехода на Parcel он не запускается.

Удалить Адаптеры у всех приказов и избавиться от IUniversalObject для представления приказов.
Подумать - может Команда и Приказ должны быть всегда вместе?
Если да - то избавиться от пакета khusamov-command-order-system

Свойство `targetObject` в классах `StartCommand` и `StopCommand` заменить с `IUniversalObject` на `IWithStoppable`.

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

Статьи по теме
---------------

http://www.skipy.ru/architecture/module_design.html
http://yugeon-dev.blogspot.com/2010/07/blog-post.html
http://yugeon-dev.blogspot.com/2010/07/inversion-of-control-containers-and_21.html
http://sergeyteplyakov.blogspot.com/2013/01/blog-post.html#AmbientContext
http://sergeyteplyakov.blogspot.com/2013/03/di-service-locator.html

https://eatdog.com.ua/assets/gamedev-slides/
https://www.youtube.com/watch?v=-gsjAz9jR3Y
http://gs-studio.com/news-about-it/30703----javascript