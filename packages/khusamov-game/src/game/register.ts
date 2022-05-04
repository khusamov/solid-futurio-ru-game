import {Queue, Vector} from 'khusamov-base-types';
import {createUniversalObject, findUniversalObject, IUniversalObject, withoutType} from 'khusamov-universal-object';
import {register, resolve} from 'khusamov-inversion-of-control';
import {createCommandQueue} from 'khusamov-command-system';
import {IMovable} from 'khusamov-mechanical-motion';
import IGameObject from './gameObject/IGameObject';
import IToroidalSurface from './gameObject/IToroidalSurface';
import {TTargetObjectSearchParams} from './order/IStartMoveTransformOrder';
import {TGameObjectList, TOrderQueue} from './types';

const commandQueue = createCommandQueue() // Очередь команд создается по особому!
const orderQueue: TOrderQueue = new Queue
const gameObjectList: TGameObjectList = []

register('GameObjectList', () => gameObjectList)
register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)

register('GameObject', (params: TTargetObjectSearchParams): IUniversalObject | undefined => {
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	return findUniversalObject(gameObjectList, withoutType(params))
})

gameObjectList.push(
	createUniversalObject<IGameObject & IToroidalSurface>({
		name: 'theGameWorld',
		kind: ['IGameObject', 'IToroidalSurface'],
		size: {width: 0, height: 0}
	})
)

gameObjectList.push(
	createUniversalObject<IGameObject & IMovable>({
		name: 'theSpaceship',
		kind: ['IGameObject', 'IMovable'],
		mass: 1000,
		position: new Vector(100, 100)
	})
)