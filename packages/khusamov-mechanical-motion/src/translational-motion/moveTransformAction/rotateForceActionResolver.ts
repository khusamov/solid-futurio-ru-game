import IMovable from '../../IMovable';
import {TMoveTransformAction} from '../MoveTransformCommand';

export enum RotateDirectionType {
	Clockwise = 'Clockwise',
	Counterclockwise = 'Counterclockwise'
}

export default function rotateForceActionResolver(increment: number, directionType: RotateDirectionType): TMoveTransformAction {
	const angle = {
		[RotateDirectionType.Clockwise]: -increment,
		[RotateDirectionType.Counterclockwise]: increment
	}[directionType]

	return (movable: IMovable) => movable.appliedForce = movable.appliedForce.rotate(angle)
}