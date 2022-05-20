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

		const {mass, rotationalInertia, torque, appliedRotationalForce, appliedRotationalForcePoint, rotation, angularAcceleration, angularVelocity} = this.rotable

		// TODO Проверить appliedForcePoint
		// Похоже вектор appliedForcePoint вычисляется на основании rotation и расстояния от position до точки приложения сил.
		// Хотя нет, appliedForcePoint и appliedForce (точнее угол силы) вычисляются в другой команде для разных объектов по разному.

		// При вращении учитывается только проекция силы на направление движения объекта.
		// TODO Проверить, вполне возможно что можно вместо проекции саму силу и использовать.
		const appliedForceProject = appliedRotationalForce.project(rotation)

		this.rotable.rotationalInertia = mass * appliedRotationalForcePoint.length * appliedRotationalForcePoint.length / 2

		this.rotable.torque = appliedRotationalForcePoint.cross(appliedForceProject)
		this.rotable.angularAcceleration = rotationalInertia > 0 ? torque.scale(1 / rotationalInertia).z : 0
		this.rotable.angularVelocity = angularVelocity + angularAcceleration * Convert.toSecond(timeInterval)
		this.rotable.rotation = rotation.rotate(angularVelocity * Convert.toSecond(timeInterval))

		this.rotable.rotableTime = currentTime
	}
}