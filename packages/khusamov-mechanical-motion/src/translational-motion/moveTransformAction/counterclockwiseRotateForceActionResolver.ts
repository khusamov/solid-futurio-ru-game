import IMovable from '../../IMovable';

export default function counterclockwiseRotateForceActionResolver(increment: number) {
	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(increment)
}