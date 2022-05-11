import {ICommand, Vector} from 'khusamov-base-types';
import IMovable from '../IMovable';

export default class IncreaseForceCommand implements ICommand {
	public readonly name = 'RotateForceCommand'

	public constructor(
		private readonly movable: IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		this.movable.appliedForce = (
			this.movable.appliedForce.isNull
				? this.movable.linearVelocity.identity.scale(this.increment)
				: this.movable.appliedForce.translate(this.movable.appliedForce.identity.scale(this.increment))
		)

		if (this.movable.appliedForce.length < 0) {
			this.movable.appliedForce = new Vector(0, 0)
		}
	}
}