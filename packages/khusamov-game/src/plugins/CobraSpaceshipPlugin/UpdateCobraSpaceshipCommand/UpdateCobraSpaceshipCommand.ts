import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody, IRotable, ITransformable} from 'khusamov-mechanical-motion';
import {Convert, Vector} from 'khusamov-base-types';
import {ICobraSpaceship} from '../ICobraSpaceship';

export class UpdateCobraSpaceshipCommand implements ICommand {
	public constructor(
		private cobra: ICobraSpaceship & IMovable & IRotable & IRigidBody & ITransformable
	) {}

	public execute(): void {
		// Вектора реактивных сил двигателей всегда паралельны и сонаправлены оси корабля.
		this.cobra.appliedLeftForce = this.cobra.rotation.identity.scale(this.cobra.appliedLeftForce.length)
		this.cobra.appliedRightForce = this.cobra.rotation.identity.scale(this.cobra.appliedRightForce.length)

		// Вычисление вектора приложенной силы.
		this.cobra.appliedMotionForce = this.cobra.appliedLeftForce.translate(this.cobra.appliedRightForce)
		this.cobra.appliedRotationalForce = this.cobra.appliedLeftForce.translate(this.cobra.appliedRightForce.inverse)
		this.cobra.appliedRotationalForce = this.cobra.rotation.identity.scale(this.cobra.appliedRotationalForce.length)

		// Вычисление плеча приложенной силы.
		const appliedForcePointLength = (
			calcAppliedForcePointLength(
				this.cobra.distanceBetweenEngines,
				this.cobra.appliedLeftForce,
				this.cobra.appliedRightForce
			)
		)

		// Вычисление вектора плеча приложенной силы.
		this.cobra.appliedRotationalForcePoint = (
			this.cobra.rotation
				.rotate(Convert.toRadian(90))
				.identity.scale(appliedForcePointLength)
		)
	}
}

/**
 * Вычисление плеча приложенной силы.
 * @param D
 * @param appliedLeftForce
 * @param appliedRightForce
 */
function calcAppliedForcePointLength(D: number, appliedLeftForce: Vector, appliedRightForce: Vector) {
	if (appliedLeftForce.length === 0 && appliedRightForce.length === 0) {
		return 0
	} else if (appliedLeftForce.length === 0 && appliedRightForce.length > 0) {
		return D / 2
	} else if (appliedLeftForce.length > 0 && appliedRightForce.length === 0) {
		return -D / 2
	} else {
		const rateForce = appliedLeftForce.length / appliedRightForce.length
		return D / 2 - (rateForce * D) / (1 + rateForce)
	}
}