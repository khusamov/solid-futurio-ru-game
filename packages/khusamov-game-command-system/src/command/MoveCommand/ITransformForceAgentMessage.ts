import {IAgentMessage} from 'khusamov-command-system';

/**
 * @adaptable
 */
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