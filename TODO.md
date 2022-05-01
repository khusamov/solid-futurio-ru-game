TODO
====

khusamov-game-command-system заменить на khusamov-mechanical-movement  

khusamov-inversion-of-control-sample заменить на khusamov-game  

khusamov-game-command-system перенести в deprecated  
khusamov-inversion-of-control-sample перенести в deprecated  

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