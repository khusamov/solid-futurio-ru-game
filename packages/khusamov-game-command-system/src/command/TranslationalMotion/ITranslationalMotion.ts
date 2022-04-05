import {Vector} from 'khusamov-base-types';

export default interface ITranslationalMotion {
	/**
	 * Масса движущегося объекта.
	 */
	mass: number

	/**
	 * Приложенная сила.
	 */
	appliedForce: Vector

	/**
	 * Линейное ускорение.
	 */
	linearAcceleration: Vector

	/**
	 * Линейная скорость.
	 */
	linearVelocity: Vector

	/**
	 * Координаты движущегося объекта.
	 */
	position: Vector
}