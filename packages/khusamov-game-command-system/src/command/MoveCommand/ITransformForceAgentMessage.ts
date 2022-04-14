import {IAgentMessage} from 'khusamov-command-system';

export default interface ITransformForceAgentMessage extends IAgentMessage {
	type: 'TransformForce'
	targetObject: {
		id: number
		type: 'GameObject'
	}
	scale: number
	angle: number
}