import {Vector} from 'khusamov-base-types';
import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export default function decreaseForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => {
		movable.appliedForce = (
			movable.appliedForce.isNull || movable.appliedForce.length < increment
				? new Vector(0, 0)
				: movable.appliedForce.translate(movable.appliedForce.identity.scale(-increment))
		)
	}
}