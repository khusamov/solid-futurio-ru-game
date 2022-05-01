import {register} from 'khusamov-inversion-of-control';
import {startMoveTransformCommandResolver} from './order/IMoveTransformOrder';
import {stopCommandResolver} from './order/IStopOrder';
import {MoveTransformCollection} from 'khusamov-mechanical-motion';
import {IQueue, Queue} from 'khusamov-base-types';
import {createCommandQueue} from 'khusamov-command-system';

type TGameObject = Record<string, any>
type TOrder = Record<string, any>

// Глобальные объекты.

const commandQueue = createCommandQueue() // Очередь команд создается по особому!
const orderQueue: IQueue<TOrder> = new Queue
const gameObjectList: TGameObject[] = []
const moveTransformCollection = new MoveTransformCollection

// Регистрации.

register('Stop', stopCommandResolver)
register('StartMoveTransform', startMoveTransformCommandResolver)
register('GameObjectList', () => gameObjectList)
register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)

register('GameObject', () => {
	// TODO Дописать register GameObject
	throw new Error('Зависимость GameObject не определена')
})

for (const transform of moveTransformCollection.transforms) {
	// register MoveTransform:<Имя трансформации>
	register(transform.name, transform.action)
}