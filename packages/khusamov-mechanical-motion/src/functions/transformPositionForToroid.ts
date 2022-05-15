import {ISize, Vector} from 'khusamov-base-types';

/**
 * Специальная функция для корректировки координат движущихся объектов
 * с целью создания замкнутого пространства типа бублик.
 * @param position
 * @param toroidalSurfaceSize
 */
export function transformPositionForToroid(position: Vector, {width, height}: ISize): Vector {
	// Ограничить по положительной полуоси.
	const result = position.mod(new Vector(width, height))
	// Ограничить по отрицательной полуоси.
	return (
		result.translate(
			new Vector(
				result.x < 0 ? width : 0,
				result.y < 0 ? height : 0
			)
		)
	)
}