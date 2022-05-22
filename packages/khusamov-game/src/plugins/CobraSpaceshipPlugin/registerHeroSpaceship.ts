import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../../game/types';
import {Vector} from 'khusamov-base-types';
import {createUniversalObject} from 'khusamov-universal-object';
import IGameObject from '../../game/gameObject/IGameObject';
import {
	IMovable,
	IMoveCommandOrder,
	IRigidBody,
	IRotable,
	IRotateCommandOrder,
	IToroidalTransformCommandOrder,
	ITransformable
} from 'khusamov-mechanical-motion';
import IRenderable from '../../game/gameObject/IRenderable';
import {IStartCommandOrder, TOrderQueue} from 'khusamov-command-system';
import {TGameObjectResolver} from '../GlobalGameObjectPlugin/gameObjectResolver';
import {IUpdateCobraSpaceshipCommandOrder} from './UpdateCobraSpaceshipCommand';
import {ICobraSpaceship} from './ICobraSpaceship';

type THeroSpaceship = IGameObject & ITransformable & IRigidBody & IMovable & IRenderable & IRotable & ICobraSpaceship

/**
 * Генерация космического корабля главного героя.
 */
export default function registerHeroSpaceship() {
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const orderQueue = resolve<TOrderQueue>('OrderQueue')

	gameObjectList.push(
		createUniversalObject<Partial<THeroSpaceship>>({
			name: 'theSpaceship',
			kind: ['IGameObject', 'ITransformable', 'IRigidBody', 'IMovable', 'IRenderable', 'IRotable', 'ICobraSpaceship'],
			renderComponent: 'Spaceship',
			mass: 1000,
			distanceBetweenEngines: 100,
			rotation: new Vector(1, 0)
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

	type TStartRotateCommandOrder = IStartCommandOrder<TGameObjectResolver, IRotateCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue<TStartRotateCommandOrder>({
		type: 'StartCommand',
		targetObject: ['GameObject', 'theSpaceship'],
		commandName: 'RotateCommand',
		command: {
			type: 'RotateCommand',
			targetObject: ['GameObject', 'theSpaceship']
		}
	})

	type IStartUpdateCobraSpaceshipCommandOrder = IStartCommandOrder<TGameObjectResolver, IUpdateCobraSpaceshipCommandOrder<TGameObjectResolver>>
	orderQueue.enqueue<IStartUpdateCobraSpaceshipCommandOrder>({
		type: 'StartCommand',
		targetObject: ['GameObject', 'theSpaceship'],
		commandName: 'UpdateCobraSpaceshipCommand',
		command: {
			type: 'UpdateCobraSpaceshipCommand',
			targetObject: ['GameObject', 'theSpaceship']
		}
	})
}