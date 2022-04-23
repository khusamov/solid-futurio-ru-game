import {Vector} from 'khusamov-base-types';
import {IAgentMessage} from 'khusamov-command-system';
import ITargetObject from './ITargetObject';

/**
 * @adaptable
 */
export default interface ITransformForceAgentMessage extends IAgentMessage {
	type: 'TransformForce'
	targetObject: ITargetObject
	translate: Vector
	rotate: number
	scale: number
}