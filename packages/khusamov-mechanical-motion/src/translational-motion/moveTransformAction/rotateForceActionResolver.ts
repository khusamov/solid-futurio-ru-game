import IMovable from '../../IMovable';

export enum ERotateDirection {
	Clockwise = 'Clockwise',
	Counterclockwise = 'Counterclockwise'
}

export default function rotateForceActionResolver(increment: number, direction: ERotateDirection) {
	const angle = {
		[ERotateDirection.Clockwise]: -increment,
		[ERotateDirection.Counterclockwise]: increment
	}[direction]

	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(angle)
}