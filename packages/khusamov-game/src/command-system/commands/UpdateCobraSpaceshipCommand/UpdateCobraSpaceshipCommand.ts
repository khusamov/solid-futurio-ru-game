import {ICommand} from 'khusamov-command-system';
import {ICobraSpaceship} from '../../../interfaces';
import {IMovable, IRigidBody, IRotable, ITransformable} from 'khusamov-mechanical-motion';
import {Convert} from 'khusamov-base-types';

/**
 * Расстояние между двигателями.
 * Метры.
 */
const D = 100 * 2

export class UpdateCobraSpaceshipCommand implements ICommand {
	public constructor(
		private cobra: ICobraSpaceship & IMovable & IRotable & IRigidBody & ITransformable
	) {}

	public execute(): void {
		// Вектора реактивных сил двигателей всегда паралельны и сонаправлены оси корабля.
		this.cobra.appliedLeftForce = this.cobra.rotation.identity.scale(this.cobra.appliedLeftForce.length)
		this.cobra.appliedRightForce = this.cobra.rotation.identity.scale(this.cobra.appliedRightForce.length)
		// Вычисление вектора приложенной силы.
		this.cobra.appliedForce = this.cobra.appliedLeftForce.translate(this.cobra.appliedRightForce)
		// Вычисление плеча приложенной силы.
		const rateForce = this.cobra.appliedLeftForce.length / this.cobra.appliedRightForce.length
		const appliedForcePointLength = (D - D * rateForce) / (2 - 2 * rateForce)
		// Вычисление вектора плеча приложенной силы.
		this.cobra.appliedForcePoint = (
			this.cobra.rotation
				.rotate(Convert.toRadian(90))
				.identity.scale(appliedForcePointLength)
		)
	}
}