import {IAgentMessage} from '../AgentMessageInterpretCommand';

export default interface ITransformForceAgentMessage extends IAgentMessage {
	type: 'TransformForce'
	targetObject: {
		id: number
		type: 'GameObject'
	}
	scale: number
	angle: number
}