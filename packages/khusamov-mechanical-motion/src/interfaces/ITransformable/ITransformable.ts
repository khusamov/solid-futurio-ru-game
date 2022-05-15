import {Vector} from 'khusamov-base-types';

/**
 * Интерфейс объекта, для которого вычисляется координаты и вращение.
 * @adaptable
 */
export interface ITransformable {
	/**
	 * Координаты объекта.
	 * Метры.
	 */
	position: Vector

	/**
	 * Угол вращения объекта.
	 */
	rotation: Vector

	/**
	 * Масштабирование объекта.
	 */
	scale: Vector
}