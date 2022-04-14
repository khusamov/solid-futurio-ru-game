import IAgentMessage from '../AgentMessageInterpretCommand/IAgentMessage';

export default interface IStopAgentMessage extends IAgentMessage {
	type: 'StopCommand'
	commandName: string
	targetObject: {
		id: number,
		type: 'GameObject'
	}
}