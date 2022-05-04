import {ISize, Queue, Timer, Vector} from 'khusamov-base-types';
import {register, resolve} from 'khusamov-inversion-of-control';
import {createUniversalObject, findUniversalObject, IUniversalObject, withoutType} from 'khusamov-universal-object';
import {createCommandQueue, InterpretOrderCommand, RepeatableCommand, TCommandQueue, TOrderQueue} from 'khusamov-command-system';
import {
	clockwiseRotateForceActionResolver,
	counterclockwiseRotateForceActionResolver, decreaseForceActionResolver,
	IMovable, increaseForceActionResolver,
	toroidalTransformActionResolver
} from 'khusamov-mechanical-motion';
import IStartMoveTransformOrder, {startMoveTransformCommandResolver, TTargetObjectSearchParams} from './order/IStartMoveTransformOrder';
import IStartMoveOrder, {startMoveCommandResolver} from './order/IStartMoveOrder';
import ToroidalSurfaceAdapter from './gameObject/ToroidalSurfaceAdapter';
import IGameObject from './gameObject/IGameObject';
import IToroidalSurface from './gameObject/IToroidalSurface';
import {TGameObjectList} from './types';
import IStopOrder from './order/IStopOrder';
import WithStoppableAdapter from 'khusamov-command-system/dist/adapter/WithStoppableAdapter';

const DEBUG = false

register('StartMove', startMoveCommandResolver)
register('StartMoveTransform', startMoveTransformCommandResolver)
register('MoveTransformAction.ToroidalPositionTransformation', toroidalTransformActionResolver)
register('MoveTransformAction.ClockwiseRotateForce', clockwiseRotateForceActionResolver)
register('MoveTransformAction.CounterclockwiseRotateForce', counterclockwiseRotateForceActionResolver)
register('MoveTransformAction.DecreaseForce', decreaseForceActionResolver)
register('MoveTransformAction.IncreaseForce', increaseForceActionResolver)

const commandQueue: TCommandQueue = createCommandQueue() // Очередь команд создается по особому!
const orderQueue: TOrderQueue = new Queue
const gameObjectList: TGameObjectList = []

register('GameObjectList', () => gameObjectList)
register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)

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
	createUniversalObject<IGameObject & IMovable>({
		name: 'theSpaceship',
		kind: ['IGameObject', 'IMovable'],
		mass: 1000,
		position: new Vector(100, 100),
		appliedForce: new Vector(1000, 1000)
	})
)

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))

if (DEBUG) {
	register('GameTimer', (): Timer => (
		new Timer(1000, () => {
			const commandQueue = resolve<TCommandQueue>('CommandQueue')
			const command = commandQueue.dequeue()
			if (command) {
				console.log(command.name)
				command.execute()
			}
		})
	))
} else {
	register('GameTimer', (): Timer => (
		new Timer(0, () => {
			const commandQueue = resolve<TCommandQueue>('CommandQueue')
			commandQueue.dequeue()?.execute()
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




document.addEventListener('keydown', event => {
	if (event.code === 'KeyQ') {
		const theSpaceshipWithStoppable = (
			new WithStoppableAdapter(
				resolve<IUniversalObject, [TTargetObjectSearchParams]>(
					'GameObject',
					{
						type: 'GameObject',
						name: 'theSpaceship'
					}
				)
			)
		)
		console.log('theSpaceshipWithStoppable.stoppableMap', theSpaceshipWithStoppable.stoppableMap)
		// orderQueue.enqueue(
		// 	createUniversalObject<IStopOrder>({
		// 		type: 'Stop',
		// 		command: '',
		// 		targetObject: {
		// 			type: 'GameObject',
		// 			name: 'theSpaceship'
		// 		}
		// 	})
		// )
	}
})






