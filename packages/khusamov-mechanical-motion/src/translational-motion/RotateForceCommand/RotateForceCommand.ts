import {ICommand} from 'khusamov-command-system';
import {IMovable} from '../../interfaces';

export class RotateForceCommand implements ICommand {
	public readonly name = 'RotateForceCommand'

	public constructor(
		private readonly movable: IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.rotate(this.increment)
	}
}