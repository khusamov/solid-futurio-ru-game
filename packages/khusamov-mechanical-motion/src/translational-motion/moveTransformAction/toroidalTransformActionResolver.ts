import {ISize} from 'khusamov-base-types';
import transformPositionForToroid from '../../functions/transformPositionForToroid';
import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export type TGetSize = () => ISize

export default function toroidalTransformActionResolver(getToroidalSurfaceSize: TGetSize): TMoveTransformAction {
	return (
		(movable: IMovable) =>
			movable.position = (
				transformPositionForToroid(
					movable.position,
					getToroidalSurfaceSize()
				)
			)
	)
}