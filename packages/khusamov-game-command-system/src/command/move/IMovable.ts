import {Vector} from 'khusamov-base-types';

export default interface IMovable {
	position: Vector
	readonly movementVelocity: Vector
}