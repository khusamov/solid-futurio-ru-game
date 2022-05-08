import {EventEmitter} from 'events';
import {ISize, Queue, QueueLog, Timer, Vector} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {
	createUniversalObject,
	findUniversalObject,
	IUniversalObject,
	withoutType
} from 'khusamov-universal-object';
import {
	createCommandQueue,
	InterpretOrderCommand,
	RepeatableCommand,
	TCommandQueue,
	TOrderQueue
} from 'khusamov-command-system';
import {
	IMovable,
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver,
	decreaseForceActionResolver,
	increaseForceActionResolver,
	toroidalTransformActionResolver, ITransformable
} from 'khusamov-mechanical-motion';
import IStartMoveTransformOrder, {startMoveTransformCommandResolver, TTargetObjectSearchParams} from './order/IStartMoveTransformOrder';
import IStartMoveOrder, {startMoveCommandResolver} from './order/IStartMoveOrder';
import ToroidalSurfaceAdapter from './gameObject/ToroidalSurfaceAdapter';
import {destroyCommandResolver} from './order/IDestroyOrder';
import IGameObject from './gameObject/IGameObject';
import IToroidalSurface from './gameObject/IToroidalSurface';
import {TGameObjectList} from './types';
import IRenderable from './gameObject/IRenderable';
import createObjectKeyboardControl from './keyboardShortcut/createObjectKeyboardControl';
import {stopCommandResolver} from './order/IStopOrder';

const DEBUG = false
const LOG = false

register('Stop', stopCommandResolver)
register('Destroy', destroyCommandResolver)
register('StartMove', startMoveCommandResolver)
register('StartMoveTransform', startMoveTransformCommandResolver)
register('MoveTransformAction.ToroidalPositionTransformation', toroidalTransformActionResolver)
register('MoveTransformAction.ClockwiseRotateForce', clockwiseRotateForceActionResolver)
register('MoveTransformAction.CounterclockwiseRotateForce', counterclockwiseRotateForceActionResolver)
register('MoveTransformAction.DecreaseForce', decreaseForceActionResolver)
register('MoveTransformAction.IncreaseForce', increaseForceActionResolver)

const commandQueue: TCommandQueue = createCommandQueue() // Очередь команд создается по особому!
const commandQueueEventEmitter = new EventEmitter()
const gameObjectList: TGameObjectList = []

function createOrderQueue(): TOrderQueue {
	if (LOG) {
		const [orderQueue, orderQueueLog] = QueueLog.create<IUniversalObject>(new Queue)
		Object.defineProperty(window, 'orderQueueLog', {value: orderQueueLog})
		return orderQueue
	} else {
		return new Queue
	}
}
const orderQueue: TOrderQueue = createOrderQueue()

register('GameObjectList', () => gameObjectList)
register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)
register('CommandQueue.EventEmitter', () => commandQueueEventEmitter)

function gameObjectResolver(params: TTargetObjectSearchParams): IUniversalObject | undefined {
	return findUniversalObject(
		resolve<TGameObjectList>('GameObjectList'),
		withoutType(params)
	)
}

register('GameObject', gameObjectResolver)

/**
 * Генерация основных игровых объектов.
 */
{
	gameObjectList.push(
		createUniversalObject<IGameObject & ITransformable>({
			name: 'theCamera',
			kind: ['IGameObject', 'ITransformable']
		})
	)

	gameObjectList.push(
		createUniversalObject<IGameObject & IToroidalSurface>({
			name: 'theGameWorld',
			kind: ['IGameObject', 'IToroidalSurface'],
			size: {width: 3000, height: 3000}
		})
	)

	gameObjectList.push(
		createUniversalObject<IGameObject & ITransformable & IMovable & IRenderable>({
			name: 'theSpaceship',
			kind: ['IGameObject', 'ITransformable', 'IMovable', 'IRenderable'],
			renderComponent: 'Spaceship',
			mass: 1000
		})
	)
}

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))

/**
 * Генерация статических звезд.
 */
{
	function getRandomInt(min: number, max: number) {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
	}

	const theGameWorld = (
		new ToroidalSurfaceAdapter(
			resolve<IUniversalObject, [TTargetObjectSearchParams]>(
				'GameObject',
				{
					type: 'GameObject',
					name: 'theGameWorld'
				}
			)
		)
	)

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
				createUniversalObject<IGameObject & ITransformable & IRenderable>({
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

orderQueue.enqueue(
	createUniversalObject<IStartMoveOrder>({
		type: 'StartMove',
		targetObject: {
			type: 'GameObject',
			name: 'theSpaceship'
		}
	})
)

function getToroidalSurfaceSize(): ISize {
	const theGameWorld = (
		new ToroidalSurfaceAdapter(
			resolve<IUniversalObject, [TTargetObjectSearchParams]>(
				'GameObject',
				{
					type: 'GameObject',
					name: 'theGameWorld'
				}
			)
		)
	)
	return theGameWorld.size
}

orderQueue.enqueue(
	createUniversalObject<IStartMoveTransformOrder>({
		type: 'StartMoveTransform',
		targetObject: {
			type: 'GameObject',
			name: 'theSpaceship'
		},
		transformAction: [
			'ToroidalPositionTransformation',
			getToroidalSurfaceSize
		]
	})
)

register('SelectedGameObject', () => (
	resolve<IUniversalObject, [TTargetObjectSearchParams]>(
		'GameObject',
		{
			type: 'GameObject',
			name: 'theSpaceship'
		}
	)
))

createObjectKeyboardControl()


// Демонстрация возможности уничтожения объектов.
// document.addEventListener('keydown', event => {
// 	if (event.code === 'KeyQ') {
// 		orderQueue.enqueue(
// 			createUniversalObject<IDestroyOrder>({
// 				type: 'Destroy',
// 				targetObject: {
// 					type: 'GameObject',
// 					name: 'theSpaceship'
// 				}
// 			})
// 		)
// 	}
// })




