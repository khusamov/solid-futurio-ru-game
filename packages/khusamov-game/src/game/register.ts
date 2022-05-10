import {EventEmitter} from 'events';
import {Timer, Vector} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {
	createUniversalObject,
	IUniversalObject
} from 'khusamov-universal-object';
import {
	createCommandQueue,
	RepeatableCommand,
	TCommandQueue
} from 'khusamov-command-system';
import {
	IMovable, ITransformable,
	decreaseForceActionResolver,
	increaseForceActionResolver,
	toroidalTransformActionResolver,
	rotateForceActionResolver,
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver
} from 'khusamov-mechanical-motion';
import ToroidalSurfaceAdapter from './gameObject/ToroidalSurfaceAdapter';
import IGameObject from './gameObject/IGameObject';
import IToroidalSurface from './gameObject/IToroidalSurface';
import {TGameObjectList} from './types';
import IRenderable from './gameObject/IRenderable';
import gameObjectResolver, {TGameObjectResolver} from './gameObjectResolver';
import {
	InterpretOrderCommand,
	IStartCommandOrder,
	relayCommandResolver,
	startCommandResolver,
	stopCommandResolver,
	TOrderQueue
} from 'khusamov-command-order-system';
import IMoveCommandOrder, {moveCommandResolver} from '../orders/IMoveCommandOrder';
import getGameWorldSize from './getGameWorldSize';
import IMoveTransformCommandOrder from '../orders/IMoveTransformCommandOrder';
import createOrderQueue from './createOrderQueue';

const DEBUG = false
const LOG = false

register('StartCommand', startCommandResolver)
register('StopCommand', stopCommandResolver)
register('RelayCommand', relayCommandResolver)
register('MoveCommand', moveCommandResolver)
register('MoveTransformAction.ToroidalPositionTransformation', toroidalTransformActionResolver)
register('MoveTransformAction.ClockwiseRotateForce', clockwiseRotateForceActionResolver)
register('MoveTransformAction.CounterclockwiseRotateForce', counterclockwiseRotateForceActionResolver)
register('MoveTransformAction.RotateForce', rotateForceActionResolver)
register('MoveTransformAction.DecreaseForce', decreaseForceActionResolver)
register('MoveTransformAction.IncreaseForce', increaseForceActionResolver)

register('MoveTransformCommand', relayCommandResolver)
register('GameObject', gameObjectResolver)
register('SelectedGameObject', () => resolve<IUniversalObject>('GameObject', 'theSpaceship'))

const orderQueue: TOrderQueue = createOrderQueue(LOG)
const commandQueue: TCommandQueue = createCommandQueue() // Очередь команд создается по особому!
const commandQueueEventEmitter = new EventEmitter()
const gameObjectList: TGameObjectList = []

register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)
register('CommandQueue.EventEmitter', () => commandQueueEventEmitter)
register('GameObjectList', () => gameObjectList)

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))

/**
 * Генерация основных игровых объектов.
 */
{
	gameObjectList.push(
		createUniversalObject<Partial<IGameObject & ITransformable>>({
			name: 'theCamera',
			kind: ['IGameObject', 'ITransformable']
		})
	)

	gameObjectList.push(
		createUniversalObject<IGameObject & IToroidalSurface>({
			name: 'theGameWorld',
			kind: ['IGameObject', 'IToroidalSurface'],
			size: {
				width: 3000,
				height: 3000
			}
		})
	)
}

/**
 * Генерация космического корабля.
 */
{
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

	type TStartMoveTransformCommandOrder = IStartCommandOrder<TGameObjectResolver, IMoveTransformCommandOrder>
	orderQueue.enqueue(
		createUniversalObject<TStartMoveTransformCommandOrder>({
			type: 'StartCommand',
			targetObject: ['GameObject', 'theSpaceship'],
			commandName: 'MoveTransformAction.ToroidalPositionTransformation',
			command: {
				type: 'MoveTransformCommand',
				name: 'MoveTransformAction.ToroidalPositionTransformation',
				action: ['MoveTransformAction.ToroidalPositionTransformation', getGameWorldSize]
			}
		})
	)
}


/**
 * Генерация статических звезд.
 */
{
	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
	}

	const theGameWorld = new ToroidalSurfaceAdapter(resolve<IUniversalObject>('GameObject', 'theGameWorld'))

	Array(100)
		.fill(1)
		.map(() => {
			const scale = getRandomInt(1, 10)
			return {
				position: new Vector(
					getRandomInt(0, theGameWorld.size.width),
					getRandomInt(0, theGameWorld.size.height)
				),
				scale: new Vector(scale, scale)
			}
		})
		.forEach(({scale, position}, index) => {
			gameObjectList.push(
				createUniversalObject<Partial<IGameObject & ITransformable & IRenderable>>({
					name: 'theStar' + index,
					kind: ['IGameObject', 'ITransformable', 'IRenderable'],
					renderComponent: 'Star',
					position,
					scale
				})
			)
		})
}

if (DEBUG) {
	register('GameTimer', (): Timer => (
		new Timer(1000, () => {
			const commandQueue = resolve<TCommandQueue>('CommandQueue')
			const command = commandQueue.dequeue()
			if (command) {
				console.log(command)
				command.execute()
				commandQueueEventEmitter.emit('execute', command)
			}
		})
	))
} else {
	register('GameTimer', (): Timer => (
		new Timer(1, () => {
			const commandQueue = resolve<TCommandQueue>('CommandQueue')
			const command = commandQueue.dequeue()
			if (command) {
				command.execute()
				commandQueueEventEmitter.emit('execute', command)
			}
		})
	))
}


