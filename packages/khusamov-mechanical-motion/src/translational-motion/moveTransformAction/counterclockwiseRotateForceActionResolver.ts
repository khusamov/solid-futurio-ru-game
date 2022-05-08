import IMovable from '../../IMovable';

/**
 * Используйте rotateForceActionResolver()
 * @deprecated
 * @param increment
 */
export default function counterclockwiseRotateForceActionResolver(increment: number) {
	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(increment)
}