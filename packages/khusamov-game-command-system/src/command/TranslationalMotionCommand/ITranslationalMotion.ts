import {Vector} from 'khusamov-base-types';

export default interface ITranslationalMotion {
	mass: number
	position: Vector

	/**
	 * Приложенная сила.
	 */
	appliedForce: Vector

	/**
	 * Линейная скорость.
	 */
	linearVelocity: Vector

	/**
	 * Линейное ускорение.
	 */
	linearAcceleration: Vector
}