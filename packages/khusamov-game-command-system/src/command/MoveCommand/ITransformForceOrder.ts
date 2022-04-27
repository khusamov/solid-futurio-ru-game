import {Vector} from 'khusamov-base-types';
import {IOrder} from 'khusamov-command-system';
import ITargetObject from './ITargetObject';

/**
 * @adaptable
 */
export default interface ITransformForceOrder extends IOrder {
	type: 'TransformForce'
	commandName: string
	targetObject: ITargetObject
	translate: Vector
	rotate: number
	scale: number
	length: number
}