import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

/**
 * Используйте rotateForceActionResolver()
 * @deprecated
 * @param increment
 */
export default function clockwiseRotateForceActionResolver(increment: number): TMoveTransformAction {
	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(-increment)
}