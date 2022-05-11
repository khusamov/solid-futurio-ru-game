import {register, resolve} from 'khusamov-inversion-of-control';
import {InterpretOrderCommand, relayCommandResolver, startCommandResolver, stopCommandResolver, TOrderQueue} from 'khusamov-command-order-system';
import {
	increaseForceCommandResolver,
	moveCommandResolver,
	rotateForceCommandResolver,
	toroidalTransformCommandResolver
} from 'khusamov-mechanical-motion';
import gameObjectResolver from '../gameObjectResolver';
import {IUniversalObject} from 'khusamov-universal-object';
import createOrderQueue from '../createOrderQueue';
import {createCommandQueue, RepeatableCommand, TCommandQueue} from 'khusamov-command-system';
import {EventEmitter} from 'events';
import {TGameObjectList} from '../types';
import registerGlobalGameObjects from './registerGlobalGameObjects';
import registerHeroSpaceship from './registerHeroSpaceship';
import registerStaticStarCluster from './registerStaticStarCluster';
import {registerShortcuts} from './registerShortcuts';
import createGameTimer from '../createGameTimer';
import gameWorldSizeResolver from '../gameWorldSizeResolver';

const DEBUG = false
const LOG = false

register('StartCommand', startCommandResolver)
register('StopCommand', stopCommandResolver)
register('RelayCommand', relayCommandResolver)
register('MoveCommand', moveCommandResolver)
register('IncreaseForceCommand', increaseForceCommandResolver)
register('RotateForceCommand', rotateForceCommandResolver)
register('ToroidalTransformCommand', toroidalTransformCommandResolver)

register('GameObject', gameObjectResolver)
register('GameWorldSize', gameWorldSizeResolver)
register('SelectedGameObject', () => resolve<IUniversalObject>('GameObject', 'theSpaceship'))

const orderQueue: TOrderQueue = createOrderQueue(LOG)
const commandQueue: TCommandQueue = createCommandQueue() // Очередь команд создается по особому!
const commandQueueEventEmitter = new EventEmitter()
const gameObjectList: TGameObjectList = []
const gameTimer = createGameTimer(DEBUG)

register('OrderQueue', () => orderQueue)
register('CommandQueue', () => commandQueue)
register('CommandQueue.EventEmitter', () => commandQueueEventEmitter)
register('GameObjectList', () => gameObjectList)
register('GameTimer', () => gameTimer)

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))

registerShortcuts()
registerGlobalGameObjects()
registerHeroSpaceship()
registerStaticStarCluster()