import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IAgentMessage from './IAgentMessage';

type TAgentMessageQueue = IQueue<IUniversalObject>

function dequeueAgentMessageObject(): IUniversalObject | undefined {
	const agentMessageQueue = resolve<TAgentMessageQueue | undefined>('Agent.MessageQueue')
	return agentMessageQueue ? agentMessageQueue.dequeue() : undefined
}

function convertAgentMessage(agentMessageObject: IUniversalObject): ICommand {
	const message = resolve<IAgentMessage>('Adapter', agentMessageObject, reflect<IAgentMessage>())
	return  resolve<ICommand>(message.type, agentMessageObject)
}

/**
 * Интерпретация сообщения от клиента.
 * Сообщение от клиента превращается в команду, которая затем размещается в очереди команд.
 * https://stepik.org/lesson/664251/step/1?unit=662137
 */
export default class AgentMessageInterpretCommand implements ICommand {
	public readonly name = 'AgentMessageInterpretCommand'
	commandQueue?: IQueue<ICommand>

	execute(): void {
		const agentMessageObject = dequeueAgentMessageObject()
		if (agentMessageObject) {
			const agentCommand = convertAgentMessage(agentMessageObject)
			agentCommand.commandQueue = this.commandQueue
			this.commandQueue?.enqueue(agentCommand)
		}
	}
}