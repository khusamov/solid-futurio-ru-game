import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export default function increaseForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => {
		movable.appliedForce = (
			movable.appliedForce.isNull
				? movable.linearVelocity.identity.scale(increment)
				: movable.appliedForce.translate(movable.appliedForce.identity.scale(increment))
		)
	}
}