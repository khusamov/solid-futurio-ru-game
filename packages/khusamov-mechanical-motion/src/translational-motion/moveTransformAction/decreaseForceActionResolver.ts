import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export default function decreaseForceActionResolver(decrement: number): TMoveTransformAction {
	return (movable: IMovable) => movable.appliedForce.length -= decrement
}