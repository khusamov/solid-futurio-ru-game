import {createUniversalObject, IUniversalObject, KeyUpDownProcessor, Queue, Timer, UniversalObject} from 'khusamov-base-types';
import {adapterGeneratorResolver, register} from 'khusamov-inversion-of-control';
import {AgentMessageInterpretCommand, CommandQueue, IStopAgentMessage, RepeatablePlugin, stopCommandResolver} from 'khusamov-command-system';
import {ITransformForceAgentMessage, transformForceResolver} from 'khusamov-game-command-system';

export default function useApplication() {
	const universalObjectList: UniversalObject[] = []
	const theSpaceship = new UniversalObject
	theSpaceship.setValue('name', 'theSpaceship')
	universalObjectList.push(theSpaceship)

	register('Adapter', adapterGeneratorResolver)
	register('StopCommand', stopCommandResolver)
	register('TransformForce', transformForceResolver)
	register('GameObject', (name: string): IUniversalObject | undefined => {
		return universalObjectList.find(object => object.getValue('name') === name)
	})

	const commandQueue = new CommandQueue

	commandQueue.addPlugin(new RepeatablePlugin)

	const keyUpDownProcessor = new KeyUpDownProcessor
	const agentMessageQueue: Queue<IUniversalObject> = new Queue
	const gameTimer = new Timer(1000, () => {
		const command = commandQueue.dequeue()
		if (command) {
			console.log(command.constructor.name)
			command.execute()
		}
	})

	register('Agent.MessageQueue', (): Queue<IUniversalObject> => agentMessageQueue)
	commandQueue.enqueue(new AgentMessageInterpretCommand)

	gameTimer.start()



	document.onkeydown = event => {
		keyUpDownProcessor.onKeyDown(event, () => {
			switch (event.code) {
				case 'KeyW':
					agentMessageQueue.enqueue(
						createUniversalObject<ITransformForceAgentMessage>({
							type: 'TransformForce',
							targetObject: {
								type: 'GameObject',
								name: 'theSpaceship'
							},
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
							type: 'StopCommand',
							commandName: 'TransformForce',
							targetObject: {
								type: 'GameObject',
								name: 'theSpaceship'
							}
						})
					)
					break
			}
		})
	}
}