import {Vector} from 'khusamov-base-types';

/**
 * Интерфейс объекта, который может поступательно перемещаться.
 * @adaptable
 */
export default interface IMovable {
	/**
	 * Текущее время миллисекундах.
	 */
	time: number

	/**
	 * Масса движущегося объекта.
	 */
	mass: number

	/**
	 * Координаты движущегося объекта.
	 */
	position: Vector

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
}