import {EventEmitter} from 'events';
import {ICommand, ISize, Queue, Timer, Vector} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject, findUniversalObject, IUniversalObject, withoutType} from 'khusamov-universal-object';
import {
	createCommandQueue,
	InterpretOrderCommand,
	RepeatableCommand, StopCommand,
	TCommandQueue,
	TOrderQueue,
	WithStoppableAdapter
} from 'khusamov-command-system';
import {
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver, decreaseForceActionResolver,
	IMovable, increaseForceActionResolver,
	toroidalTransformActionResolver
} from 'khusamov-mechanical-motion';
import IStartMoveTransformOrder, {startMoveTransformCommandResolver, TTargetObjectSearchParams} from './order/IStartMoveTransformOrder';
import IStartMoveOrder, {startMoveCommandResolver} from './order/IStartMoveOrder';
import ToroidalSurfaceAdapter from './gameObject/ToroidalSurfaceAdapter';
import IDestroyOrder, {destroyCommandResolver} from './order/IDestroyOrder';
import IGameObject from './gameObject/IGameObject';
import IToroidalSurface from './gameObject/IToroidalSurface';
import {TGameObjectList} from './types';
import IRenderable from './gameObject/IRenderable';

const DEBUG = false

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
const orderQueue: TOrderQueue = new Queue
const gameObjectList: TGameObjectList = []

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

gameObjectList.push(
	createUniversalObject<IGameObject & IToroidalSurface>({
		name: 'theGameWorld',
		kind: ['IGameObject', 'IToroidalSurface'],
		size: {width: 0, height: 0}
	})
)

gameObjectList.push(
	createUniversalObject<IGameObject & IMovable & IRenderable>({
		name: 'theSpaceship',
		kind: ['IGameObject', 'IMovable', 'IRenderable'],
		renderComponent: 'Spaceship',
		mass: 1000,
		position: new Vector(100, 100)
	})
)

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))

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
		new Timer(0, () => {
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


// Демонстрация возможности уничтожения объектов.
document.addEventListener('keydown', event => {
	if (event.code === 'KeyQ') {
		orderQueue.enqueue(
			createUniversalObject<IDestroyOrder>({
				type: 'Destroy',
				targetObject: {
					type: 'GameObject',
					name: 'theSpaceship'
				}
			})
		)
	}
})






