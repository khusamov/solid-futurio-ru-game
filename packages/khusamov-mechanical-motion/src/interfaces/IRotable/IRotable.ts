import {Vector, Vector3} from 'khusamov-base-types';

export interface IRotable {
	/**
	 * Приложенная сила вращения.
	 * Ньютоны.
	 */
	appliedRotationalForce: Vector

	/**
	 * Точка приложения силы вращения.
	 * Метры.
	 */
	appliedRotationalForcePoint: Vector

	/**
	 * Время, на которое были вычислены все параметры вращающегося объекта.
	 * Миллисекунды.
	 */
	rotableTime: number

	/**
	 * Угловое ускорение.
	 * Радианы в секунду в квадрате.
	 */
	angularAcceleration: number

	/**
	 * Угловая скорость.
	 * Радианы в секунду.
	 */
	angularVelocity: number

	/**
	 * Момент инерции.
	 * Аналог массы из поступательного движения.
	 * Килограмм на метр в квадрате.
	 * Используется для отладки.
	 */
	rotationalInertia: number

	/**
	 * Момент силы (крутящий момент).
	 * Требуется для расчета столкновений.
	 * Ньютон на метр.
	 * Используется для отладки.
	* @link https://bit.ly/3Mm7QAa
 	 */
	torque: Vector3

	// /**
	//  * Угловой момент.
	//  * Произведение момента инерции на скорость.
	//  * Пока не используется.
	//  */
	// angularMomentum: number
}