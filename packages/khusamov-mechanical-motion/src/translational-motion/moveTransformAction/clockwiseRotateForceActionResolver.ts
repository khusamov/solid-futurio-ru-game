import IMovable from '../../IMovable';

export default function clockwiseRotateForceActionResolver(decrement: number) {
	return (movable: IMovable) => movable.appliedForce.rotate(-decrement)
}