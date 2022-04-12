import {reflect} from 'typescript-rtti';
import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {NotOperationCommand, repeatable} from 'khusamov-command-system';
import IAgentMessage from './IAgentMessage';

type TAgentMessageQueue = IQueue<IUniversalObject>

/**
 * Интерпретация сообщений от клиентов.
 * https://stepik.org/lesson/664251/step/1?unit=662137
 */
@repeatable
export default class AgentMessageInterpretCommand implements ICommand {
	execute(): void {
		let agentCommand: ICommand = new NotOperationCommand

		const agentMessageQueue = resolve<TAgentMessageQueue | undefined>('Agent.MessageQueue')
		if (agentMessageQueue) {
			const agentMessageObject = agentMessageQueue.dequeue()

			if (agentMessageObject) {
				const message = resolve<IAgentMessage>('Adapter', agentMessageObject, reflect<IAgentMessage>())
				agentCommand = resolve<ICommand>(message.type, agentMessageObject)
			}
		}

		agentCommand.execute()
	}
}