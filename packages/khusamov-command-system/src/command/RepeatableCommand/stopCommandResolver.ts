import {reflect} from 'typescript-rtti';
import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IStopAgentMessage from './IStopAgentMessage';
import StopCommand from './StopCommand';

export default function stopCommandResolver(agentMessageObject: IUniversalObject): ICommand {
	const stopAgentMessage = resolve<IStopAgentMessage>('Adapter', agentMessageObject, reflect<IStopAgentMessage>())
	const targetObject = resolve<IUniversalObject>(stopAgentMessage.targetObject.type, stopAgentMessage.targetObject.id)
	return new StopCommand(stopAgentMessage.commandName, targetObject)
}