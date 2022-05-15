import {Convert} from 'khusamov-base-types';
import {ICommand} from 'khusamov-command-system';
import {ITransformable, IRigidBody, IRotable} from '../../interfaces';

export class RotateCommand implements ICommand {
	public constructor(
		private rotable: ITransformable & IRigidBody & IRotable,
		private fixedTimeInterval?: number
	) {}

	execute(): void {
		const currentTime = Date.now()
		const {rotableTime = currentTime} = this.rotable
		const timeInterval = currentTime - rotableTime

		// Если фиксированный интервал задан, то выполняем вычисления не чаще этого значения.
		if (this.fixedTimeInterval && timeInterval < this.fixedTimeInterval) return

		const {mass, rotationalInertia, appliedForce, appliedForceRadius, rotation, angularAcceleration, angularVelocity} = this.rotable

		// При вращении учитывается только проекция силы на направление движения объекта.
		const force = appliedForce.project(rotation)

		this.rotable.rotationalInertia = mass * appliedForceRadius * appliedForceRadius
		this.rotable.angularAcceleration = force.length / rotationalInertia
		this.rotable.angularVelocity = angularVelocity + angularAcceleration * Convert.toSecond(timeInterval)
		this.rotable.rotation = rotation.rotate(angularVelocity * Convert.toSecond(timeInterval))

		this.rotable.rotableTime = currentTime
	}
}