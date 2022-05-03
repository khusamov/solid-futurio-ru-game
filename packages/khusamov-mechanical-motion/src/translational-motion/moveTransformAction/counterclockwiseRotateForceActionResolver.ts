import IMovable from '../../IMovable';

export default function counterclockwiseRotateForceActionResolver(increment: number) {
	return (movable: IMovable) => movable.appliedForce.rotate(+increment)
}