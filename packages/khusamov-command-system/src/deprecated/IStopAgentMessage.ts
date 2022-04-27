
import ITargetObject from './ITargetObject';
import {IAgentMessage} from './AgentMessageInterpretCommand';

/**
 * @adaptable
 */
export default interface IStopAgentMessage extends IAgentMessage {
	type: 'StopCommand'
	commandName: string
	targetObject: ITargetObject
}