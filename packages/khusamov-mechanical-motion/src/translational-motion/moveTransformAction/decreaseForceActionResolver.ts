import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';
import {Vector} from 'khusamov-base-types';

export default function decreaseForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => {
		movable.appliedForce = (
			movable.appliedForce.isNull
				? new Vector(-increment, 0)
				: movable.appliedForce.translate(movable.appliedForce.identity.scale(-increment))
		)
	}
}