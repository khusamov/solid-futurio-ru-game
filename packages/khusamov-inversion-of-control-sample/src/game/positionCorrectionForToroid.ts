import {ISize, Vector} from 'khusamov-base-types';

type TGetSize = () => ISize

/**
 * Специальная функция для корректировки координат движущихся объектов
 * с целью создания замкнутого пространства типа бублик.
 * @param position
 * @param getToroidalSurfaceSize
 */
export default function positionCorrectionForToroid(position: Vector, getToroidalSurfaceSize: TGetSize): Vector {
	const {width, height} = getToroidalSurfaceSize()
	const correctionVector = new Vector(width, height)
	let result = position.clone()
	result = result.mod(correctionVector)
	if (result.x < 0) result.x = result.x + correctionVector.x
	if (result.y < 0) result.y = result.y + correctionVector.y
	return result
}