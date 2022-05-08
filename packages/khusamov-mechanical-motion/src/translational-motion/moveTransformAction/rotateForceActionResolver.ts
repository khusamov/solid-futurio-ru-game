import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export enum ERotateDirection {
	Clockwise = 'Clockwise',
	Counterclockwise = 'Counterclockwise'
}

export default function rotateForceActionResolver(increment: number, direction: ERotateDirection): TMoveTransformAction {
	const angle = {
		[ERotateDirection.Clockwise]: -increment,
		[ERotateDirection.Counterclockwise]: increment
	}[direction]

	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(angle)
}