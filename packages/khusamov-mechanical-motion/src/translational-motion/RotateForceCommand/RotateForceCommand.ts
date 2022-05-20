import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody} from '../../interfaces';

export class RotateForceCommand implements ICommand {
	public constructor(
		private readonly movable: IRigidBody & IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		this.movable.appliedMotionForce = this.movable.appliedMotionForce.rotate(this.increment)
	}
}