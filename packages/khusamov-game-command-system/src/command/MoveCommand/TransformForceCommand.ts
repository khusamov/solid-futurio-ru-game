import {ICommand, Vector} from 'khusamov-base-types';
import IMovable from './IMovable';

export default class TransformForceCommand implements ICommand {
	public readonly name = 'TransformForceCommand'

	constructor(
		private movable: IMovable,
		private translate: Vector,
		private rotate: number,
		private scale: number
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.translate(this.translate).rotate(this.rotate).scale(this.scale)
	}
}