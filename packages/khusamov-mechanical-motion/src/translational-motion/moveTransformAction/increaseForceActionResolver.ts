import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export default function increaseForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => movable.appliedForce.length += increment
}