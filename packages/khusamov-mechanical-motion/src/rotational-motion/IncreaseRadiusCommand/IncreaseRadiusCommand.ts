import {ICommand} from 'khusamov-command-system';
import {IRigidBody, IRotable} from '../../interfaces';

export class IncreaseRadiusCommand implements ICommand {
	public constructor(
		private readonly rotable: IRigidBody & IRotable,
		private readonly increment: number
	) {}

	public execute(): void {
		if (this.rotable.appliedForceRadius + this.increment < 0) {
			this.rotable.appliedForceRadius = 0
			return
		}

		this.rotable.appliedForceRadius += this.increment
	}
}