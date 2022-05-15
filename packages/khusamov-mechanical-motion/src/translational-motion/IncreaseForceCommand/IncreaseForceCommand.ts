import {Vector} from 'khusamov-base-types';
import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody} from '../../interfaces';

export class IncreaseForceCommand implements ICommand {
	public constructor(
		private readonly movable: IRigidBody & IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		if (this.movable.appliedForce.length + this.increment < 0) {
			this.movable.appliedForce = new Vector(0, 0)
			return
		}

		this.movable.appliedForce = (
			this.movable.appliedForce.isNull
				? this.movable.linearVelocity.identity.scale(this.increment)
				: this.movable.appliedForce.translate(this.movable.appliedForce.identity.scale(this.increment))
		)
	}
}