import {Vector} from 'khusamov-base-types';
import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody} from '../../interfaces';

export class IncreaseForceCommand implements ICommand {
	public constructor(
		private readonly movable: IRigidBody & IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		if (this.movable.appliedMotionForce.length + this.increment < 0) {
			this.movable.appliedMotionForce = new Vector(0, 0)
			return
		}

		this.movable.appliedMotionForce = (
			this.movable.appliedMotionForce.isNull
				? this.movable.linearVelocity.identity.scale(this.increment)
				: this.movable.appliedMotionForce.translate(this.movable.appliedMotionForce.identity.scale(this.increment))
		)
	}
}