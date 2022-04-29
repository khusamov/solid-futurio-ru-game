import {register} from 'khusamov-inversion-of-control';
import {adapterGeneratorResolver} from 'khusamov-adapter-generator-runtime';
import {universalObjectResolver} from 'khusamov-universal-object';
import {createCommandQueue, stopCommandResolver} from 'khusamov-command-system';
import {transformForceResolver} from 'khusamov-game-command-system';
import {KeyUpDownProcessor, Queue} from 'khusamov-base-types';
import createGameTimer from './createGameTimer';
import IGameOptions from './IGameOptions';
import {TCommandQueue, TGameObjectList, TOrderQueue} from './types';

export default function init({timeout}: IGameOptions) {
	register('Adapter', adapterGeneratorResolver)
	register('StopCommand', stopCommandResolver)
	register('TransformForce', transformForceResolver)

	// TODO Вполне возможно эти переменные надо зарегистрировать в IoC.
	const keyUpDownProcessor = new KeyUpDownProcessor
	const orderQueue: TOrderQueue = new Queue
	const commandQueue: TCommandQueue = createCommandQueue()
	const gameObjectList: TGameObjectList = []

	const gameTimer = createGameTimer(timeout, commandQueue)
	register('OrderQueue', (): TOrderQueue => orderQueue)
	register('GameObjectList', (): TGameObjectList => gameObjectList)
	register('GameObject', universalObjectResolver)

	return {
		keyUpDownProcessor,
		orderQueue,
		commandQueue,
		gameObjectList,
		gameTimer
	}
}