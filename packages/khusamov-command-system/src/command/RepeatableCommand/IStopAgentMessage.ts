import IAgentMessage from '../AgentMessageInterpretCommand/IAgentMessage';
import ITargetObject from './ITargetObject';

/**
 * @adaptable
 */
export default interface IStopAgentMessage extends IAgentMessage {
	type: 'StopCommand'
	commandName: string
	targetObject: ITargetObject
}