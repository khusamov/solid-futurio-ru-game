import IMovable from '../../IMovable';

export default function clockwiseRotateForceActionResolver(increment: number) {
	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(-increment)
}