import {ITyped, Vector} from 'khusamov-base-types';
import {IOrder} from 'khusamov-command-system';

/**
 * @adaptable
 */
export default interface ITransformForceOrder extends IOrder {
	type: 'TransformForce'
	commandName: string
	targetObjectSearchData: ITyped & Record<string, any>
	translate: Vector
	rotate: number
	scale: number
	length: number
}