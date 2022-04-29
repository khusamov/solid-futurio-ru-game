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
	 * Килограммы.
	 */
	mass: number

	/**
	 * Координаты движущегося объекта.
	 * Метры.
	 */
	position: Vector

	/**
	 * Приложенная сила.
	 * Ньютоны.
	 */
	appliedForce: Vector

	/**
	 * Линейное ускорение.
	 * Метры в секунду в квадрате.
	 */
	linearAcceleration: Vector

	/**
	 * Линейная скорость.
	 * Метры в секунду.
	 */
	linearVelocity: Vector
}