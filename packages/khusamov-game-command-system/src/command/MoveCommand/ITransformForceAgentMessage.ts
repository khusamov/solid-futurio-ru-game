import {IAgentMessage} from '../AgentMessageInterpretCommand';

export default interface ITransformForceAgentMessage extends IAgentMessage {
	type: 'TransformForce'
	gameObjectId: number
	scale: number
	angle: number
}