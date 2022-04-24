import {adapterGeneratorResolver, register} from 'khusamov-inversion-of-control';
import {CommandQueue, RepeatablePlugin, stopCommandResolver} from 'khusamov-command-system';
import {transformForceResolver} from 'khusamov-game-command-system';
import {IUniversalObject, KeyUpDownProcessor, Queue} from 'khusamov-base-types';
import createGameTimer from './createGameTimer';
import IGameOptions from './IGameOptions';

type TAgentMessageQueue = Queue<IUniversalObject>

export default function init({timeout}: IGameOptions) {
	register('Adapter', adapterGeneratorResolver)
	register('StopCommand', stopCommandResolver)
	register('TransformForce', transformForceResolver)

	const keyUpDownProcessor = new KeyUpDownProcessor
	const agentMessageQueue: TAgentMessageQueue = new Queue
	const gameObjectList: IUniversalObject[] = []
	const commandQueue = new CommandQueue({plugins: [new RepeatablePlugin]})
	const gameTimer = createGameTimer(timeout, commandQueue)

	register(
		'Agent.MessageQueue',
		(): TAgentMessageQueue => agentMessageQueue
	)

	register(
		'GameObject',
		(name: string): IUniversalObject | undefined =>
			gameObjectList.find(object => object.getValue('name') === name)
	)

	return {
		keyUpDownProcessor,
		agentMessageQueue,
		gameObjectList,
		commandQueue,
		gameTimer
	}
}