import {Angle, Convert} from 'khusamov-base-types';
import IMovable from '../IMovable';
import {TMoveTransformAction} from './MoveTransformCommand';

export type TMoveTransformName = string

type TMoveTransformCollection = Record<TMoveTransformName, TMoveTransformAction>
type TTransform = {
	/**
	 * Имя трансформации в формате 'MoveTransform:<имя трансформации>',
	 * например 'MoveTransform:IncreaseForce'.
	 */
	name: TMoveTransformName
	action: TMoveTransformAction
}

export interface IMoveTransformCollectionProps {
	rotateForceIncrement?: number
	lengthForceIncrement?: number
}

const defaultMoveTransformCollectionProps = {
	lengthForceIncrement: 200,
	rotateForceIncrement: Angle.toRadian(1)
}

export default class MoveTransformCollection {
	readonly #transforms: TMoveTransformCollection

	/**
	 * Массив трансформаций в формате имя/функция, где имя выглядит следующим образом:
	 * 'MoveTransform:<имя трансформации>', например 'MoveTransform:IncreaseForce'.
	 */
	public get transforms(): TTransform[] {
		return (
			Convert
				.toArray(this.#transforms)
				.map(item => ({
					name: 'MoveTransform:' + item.key,
					action: item.value
				}))
		)
	}

	public constructor(props?: IMoveTransformCollectionProps) {
		const {
			rotateForceIncrement,
			lengthForceIncrement
		} = Object.assign({}, defaultMoveTransformCollectionProps, props)

		this.#transforms = {
			IncreaseForce: (movable: IMovable) => movable.appliedForce.length += lengthForceIncrement,
			DecreaseForce: (movable: IMovable) => movable.appliedForce.length -= lengthForceIncrement,
			ClockwiseRotateForce: (movable: IMovable) => movable.appliedForce.rotate(-rotateForceIncrement),
			CounterclockwiseRotateForce: (movable: IMovable) => movable.appliedForce.rotate(rotateForceIncrement),
		}
	}
}