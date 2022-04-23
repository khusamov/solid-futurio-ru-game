import {createUniversalObject, IUniversalObject, KeyUpDownProcessor, Queue, Timer, UniversalObject, Vector} from 'khusamov-base-types';
import {adapterGeneratorResolver, register} from 'khusamov-inversion-of-control';
import {AgentMessageInterpretCommand, CommandQueue, IStopAgentMessage, RepeatablePlugin, stopCommandResolver} from 'khusamov-command-system';
import {IMovable, ITransformForceAgentMessage, transformForceResolver} from 'khusamov-game-command-system';

register('Adapter', adapterGeneratorResolver)
register('StopCommand', stopCommandResolver)
register('TransformForce', transformForceResolver)

const keyUpDownProcessor = new KeyUpDownProcessor
const agentMessageQueue: Queue<IUniversalObject> = new Queue
const universalObjectList: UniversalObject[] = []
const commandQueue = new CommandQueue({plugins: [new RepeatablePlugin]})

register('Agent.MessageQueue', (): Queue<IUniversalObject> => agentMessageQueue)
register('GameObject', (name: string): IUniversalObject | undefined => {
	return universalObjectList.find(object => object.getValue('name') === name)
})

commandQueue.enqueue(new AgentMessageInterpretCommand)

const gameTimer = new Timer(1000, () => {
	const command = commandQueue.dequeue()
	if (command) {
		console.log(gameTimer.interval, command.name)
		command.execute()
	}
})

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

gameTimer.start()

export default function useApplication() {}