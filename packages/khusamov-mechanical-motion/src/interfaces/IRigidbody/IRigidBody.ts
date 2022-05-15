import {Vector} from 'khusamov-base-types';

export interface IRigidBody {
	/**
	 * Масса объекта.
	 * Килограммы.
	 */
	mass: number

	/**
	 * Приложенная к центру масс сила.
	 * Ньютоны.
	 */
	appliedForce: Vector

	/**
	 * Расстояние от центра масс до точки приложения силы.
	 * Метры.
	 */
	appliedForceRadius: number
}