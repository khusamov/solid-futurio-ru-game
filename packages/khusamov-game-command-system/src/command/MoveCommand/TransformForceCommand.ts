import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export default class TransformForceCommand implements ICommand {
	public readonly name = 'TransformForceCommand'

	constructor(
		private movable: IMovable,
		private scale: number,
		private angle: number
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.scale(this.scale).rotate(this.angle)
	}
}