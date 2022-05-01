import {register} from 'khusamov-inversion-of-control';
import {startMoveTransformCommandResolver} from './order/IMoveTransformOrder';
import {stopCommandResolver} from './order/IStopOrder';
import {MoveTransformCollection} from 'khusamov-mechanical-motion';

type TGameObject = Record<string, any>

const gameObjectList: TGameObject[] = []
const moveTransformCollection = new MoveTransformCollection

register('GameObjectList', () => gameObjectList)
register('GameObject', () => {
	// TODO Дописать register GameObject
	throw new Error('Зависимость GameObject не определена')
})
register('Stop', stopCommandResolver)
register('StartMoveTransform', startMoveTransformCommandResolver)
for (const transform of moveTransformCollection.transforms) {
	register(transform.name, transform.action)
}