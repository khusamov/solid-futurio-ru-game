import {Vector} from 'khusamov-base-types';

/**
 * Интерфейс объекта, для которого вычисляется механическое движение.
 * @adaptable
 */
export interface IMovable {
	/**
	 * Время, на которое были вычислены все параметры движущегося объекта.
	 * Миллисекунды.
	 */
	movableTime: number

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