import {Vector} from 'khusamov-base-types';
import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export default function increaseForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => {
		movable.appliedForce = (
			movable.appliedForce.isNull
				? new Vector(increment, 0)
				: movable.appliedForce.translate(movable.appliedForce.identity.scale(increment))
		)
	}
}