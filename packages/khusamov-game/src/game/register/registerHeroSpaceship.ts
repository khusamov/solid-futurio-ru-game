import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../types';
import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../gameObject/IGameObject';
import {IMovable, IMoveCommandOrder, IToroidalTransformCommandOrder, ITransformable} from 'khusamov-mechanical-motion';
import IRenderable from '../gameObject/IRenderable';
import {IStartCommandOrder, TOrderQueue} from 'khusamov-command-order-system';
import {TGameObjectResolver} from '../gameObjectResolver';
import getGameWorldSize from '../getGameWorldSize';

/**
 * Генерация космического корабля главного героя.
 */
export default function registerHeroSpaceship() {
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const orderQueue = resolve<TOrderQueue>('OrderQueue')

	gameObjectList.push(
		createUniversalObject<Partial<IGameObject & ITransformable & IMovable & IRenderable>>({
			name: 'theSpaceship',
			kind: ['IGameObject', 'ITransformable', 'IMovable', 'IRenderable'],
			renderComponent: 'Spaceship',
			mass: 1000
		})
	)

	type TStartMoveCommandOrder = IStartCommandOrder<TGameObjectResolver, IMoveCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue(
		createUniversalObject<TStartMoveCommandOrder>({
			type: 'StartCommand',
			commandName: 'MoveCommand',
			targetObject: ['GameObject', 'theSpaceship'],
			command: {
				type: 'MoveCommand',
				targetObject: ['GameObject', 'theSpaceship']
			}
		})
	)

	type TStartMoveTransformCommandOrder = IStartCommandOrder<TGameObjectResolver, IToroidalTransformCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue(
		createUniversalObject<TStartMoveTransformCommandOrder>({
			type: 'StartCommand',
			targetObject: ['GameObject', 'theSpaceship'],
			commandName: 'MoveTransform.ToroidalPositionTransformation',
			command: {
				type: 'ToroidalTransformCommand',
				targetObject: ['GameObject', 'theSpaceship'],
				// TODO Исправить приказ. В приказе не должно быть ссылок на объекты.
				getToroidalSurfaceSize: getGameWorldSize
			}
		})
	)
}