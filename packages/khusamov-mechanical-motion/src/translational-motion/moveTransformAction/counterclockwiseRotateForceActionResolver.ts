import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

/**
 * Используйте rotateForceActionResolver()
 * @deprecated
 * @param increment
 */
export default function counterclockwiseRotateForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(increment)
}