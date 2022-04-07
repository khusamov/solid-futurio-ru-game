import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import IAgentMessage from './IAgentMessage';
import {NotOperationCommand} from 'khusamov-command-system';

type TAgentMessageQueue = IQueue<IUniversalObject<any>>

/**
 * Интерпретация сообщений от клиентов.
 * https://stepik.org/lesson/664251/step/1?unit=662137
 */
export default class AgentMessageInterpretCommand implements ICommand {
	execute(): void {
		let agentCommand: ICommand = new NotOperationCommand

		const agentMessageQueue = IoC.resolve<TAgentMessageQueue>('Agent.MessageQueue')
		const agentMessageObject = agentMessageQueue.dequeue()

		if (agentMessageObject) {
			const message = IoC.resolve<IAgentMessage>('Adapter', agentMessageObject, reflect<IAgentMessage>())
			agentCommand = IoC.resolve<ICommand>(message.type, agentMessageObject)
		}

		agentCommand.execute()
	}
}