import {createUniversalObject, IUniversalObject, KeyUpDownProcessor, Queue, Timer, UniversalObject, Vector} from 'khusamov-base-types';
import {adapterGeneratorResolver, register} from 'khusamov-inversion-of-control';
import {AgentMessageInterpretCommand, CommandQueue, IStopAgentMessage, RepeatablePlugin, stopCommandResolver} from 'khusamov-command-system';
import {IMovable, ITransformForceAgentMessage, transformForceResolver} from 'khusamov-game-command-system';

export default function useApplication() {
	register('Adapter', adapterGeneratorResolver)
	register('StopCommand', stopCommandResolver)
	register('TransformForce', transformForceResolver)

	const universalObjectList: UniversalObject[] = []
	universalObjectList.push(
		createUniversalObject<IMovable & {name: string}>({
			name: 'theSpaceship',
			time: 0,
			mass: 1000,
			position: new Vector(0, 0),
			appliedForce: new Vector(0, 0),
			linearVelocity: new Vector(0, 0),
			linearAcceleration: new Vector(0, 0)
		})
	)

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
			console.log(gameTimer.interval, command.name)
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