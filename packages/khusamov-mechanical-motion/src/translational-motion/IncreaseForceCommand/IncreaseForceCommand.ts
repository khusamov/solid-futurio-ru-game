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
				// Если приложенная сила равна нулю, то при ее увеличении угол берем из вектора скорости.
				? this.movable.linearVelocity.identity.scale(this.increment)
				// Иначе просто увеличиваем приложенную силу.
				: this.movable.appliedForce.translate(this.movable.appliedForce.identity.scale(this.increment))
		)
	}
}