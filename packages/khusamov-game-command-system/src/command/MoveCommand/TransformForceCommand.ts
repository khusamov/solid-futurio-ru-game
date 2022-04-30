import {ICommand, Vector} from 'khusamov-base-types';
import IMovable from './IMovable';

// TODO Удалить! Вместо него использовать MoveTransformCommand

export default class TransformForceCommand implements ICommand {
	public readonly name = 'TransformForceCommand'

	constructor(
		private movable: IMovable,
		private translate: Vector,
		private rotate: number,
		private scale: number,
		private length: number
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.translate(this.translate).rotate(this.rotate).scale(this.scale)
		if (this.movable.appliedForce.length + this.length < 0) {
			this.movable.appliedForce.length = 0
		} else {
			this.movable.appliedForce.length += this.length
		}
	}
}