import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../types';
import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../gameObject/IGameObject';
import {IMovable, IMoveCommandOrder, IRigidBody, IToroidalTransformCommandOrder, ITransformable} from 'khusamov-mechanical-motion';
import IRenderable from '../gameObject/IRenderable';
import {IStartCommandOrder, TOrderQueue} from 'khusamov-command-system';
import {TGameObjectResolver} from '../resolvers/gameObjectResolver';

type THeroSpaceship = IGameObject & ITransformable & IRigidBody & IMovable & IRenderable

/**
 * Генерация космического корабля главного героя.
 */
export default function registerHeroSpaceship() {
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const orderQueue = resolve<TOrderQueue>('OrderQueue')

	gameObjectList.push(
		createUniversalObject<Partial<THeroSpaceship>>({
			name: 'theSpaceship',
			kind: ['IGameObject', 'ITransformable', 'IRigidBody', 'IMovable', 'IRenderable'],
			renderComponent: 'Spaceship',
			mass: 1000
		})
	)

	type TStartMoveCommandOrder = IStartCommandOrder<TGameObjectResolver, IMoveCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue<TStartMoveCommandOrder>({
		type: 'StartCommand',
		commandName: 'MoveCommand',
		targetObject: ['GameObject', 'theSpaceship'],
		command: {
			type: 'MoveCommand',
			targetObject: ['GameObject', 'theSpaceship']
		}
	})

	type TStartMoveTransformCommandOrder = IStartCommandOrder<TGameObjectResolver, IToroidalTransformCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue<TStartMoveTransformCommandOrder>({
		type: 'StartCommand',
		targetObject: ['GameObject', 'theSpaceship'],
		commandName: 'MoveTransform.ToroidalPositionTransformation',
		command: {
			type: 'ToroidalTransformCommand',
			targetObject: ['GameObject', 'theSpaceship'],
			toroidalSurfaceSize: ['GameWorldSize']
		}
	})
}