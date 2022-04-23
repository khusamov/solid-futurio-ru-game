import IAgentMessage from '../AgentMessageInterpretCommand/IAgentMessage';

/**
 * @adaptable
 */
export default interface IStopAgentMessage extends IAgentMessage {
	type: 'StopCommand'
	commandName: string
	targetObject: {
		type: 'GameObject'
		name?: string
		id?: number
	}
}