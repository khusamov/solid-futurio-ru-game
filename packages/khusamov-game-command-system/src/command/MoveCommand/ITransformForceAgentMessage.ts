import {IAgentMessage} from 'khusamov-command-system';

export default interface ITransformForceAgentMessage extends IAgentMessage {
	type: 'TransformForce'
	targetObject: {
		type: 'GameObject'
		name?: string
		id?: number
	}
	scale: number
	angle: number
}