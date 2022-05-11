import {Vector} from 'khusamov-base-types';

/**
 * Интерфейс объекта, для которого вычисляется механическое движение.
 * @adaptable
 */
export default interface IMovable {
	/**
	 * Время, на которое были вычислены все параметры движущегося объекта.
	 * Миллисекунды.
	 */
	time: number

	/**
	 * Масса движущегося объекта.
	 * Килограммы.
	 */
	mass: number

	/**
	 * Координаты движущегося объекта.
	 * Это свойство будет перемещено в ITransformable.
	 * Метры.
	 * @deprecated
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