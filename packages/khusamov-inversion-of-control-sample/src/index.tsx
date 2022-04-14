import 'reflect-metadata'
import ReactDOM from 'react-dom'
import {ICommand, IUniversalObject, KeyUpDownProcessor, Queue, Timer} from 'khusamov-base-types';
import {CommandQueue, StopCommand} from 'khusamov-command-system';
import Application from './components/Application';
import {adapterGeneratorResolver, register, resolve, UniversalObject} from 'khusamov-inversion-of-control';
import {AgentMessageInterpretCommand, ITransformForceAgentMessage} from 'khusamov-game-command-system';
import {reflect} from 'typescript-rtti';

register('Adapter', adapterGeneratorResolver)


interface IStopAgentMessage {
	type: 'Stop'
	commandName: string
	gameObjectId: number
}

register('Stop', (agentMessageObject: IUniversalObject): ICommand => {
	const stopAgentMessage = resolve<IStopAgentMessage>('Adapter', agentMessageObject, reflect<IStopAgentMessage>())
	const targetObject = resolve<IUniversalObject>('GameObject', stopAgentMessage.gameObjectId)
	return new StopCommand(stopAgentMessage.commandName, targetObject)
})


const keyUpDownProcessor = new KeyUpDownProcessor
const commandQueue = new CommandQueue
const agentMessageQueue: Queue<IUniversalObject> = new Queue
const gameTimer = new Timer(1000, () => commandQueue.dequeue()?.execute())

register('Agent.MessageQueue', (): Queue<IUniversalObject> => agentMessageQueue)
commandQueue.enqueue(new AgentMessageInterpretCommand)

gameTimer.start()

function createUniversalObject<T extends object>(object: T): UniversalObject {
	const result = new UniversalObject
	for (const key in object) {
		if (object.hasOwnProperty(key)) {
			result.setValue(key, object[key])
		}
	}
	return result
}

document.onkeydown = event => {
	keyUpDownProcessor.onKeyDown(event, () => {
		switch (event.code) {
			case 'KeyW':
				agentMessageQueue.enqueue(
					createUniversalObject<ITransformForceAgentMessage>({
						type: 'TransformForce',
						gameObjectId: 1,
						angle: 0,
						scale: 1
					})
				)
				break
		}
	})
}

document.onkeyup = event => {
	keyUpDownProcessor.onKeyUp(event, () => {
		switch (event.code) {
			case 'KeyW':
				agentMessageQueue.enqueue(
					createUniversalObject<IStopAgentMessage>({
						type: 'Stop',
						commandName: 'TransformForce',
						gameObjectId: 1
					})
				)
				break
		}
	})
}



ReactDOM.render(<Application/>, document.getElementById('application'))