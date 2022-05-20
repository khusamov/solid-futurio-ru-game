import {Convert} from 'khusamov-base-types';
import {ICommand} from 'khusamov-command-system';
import {IMovable, IRigidBody, ITransformable} from '../../interfaces';

/**
 * Поступательное движение.
 *
 * Рассчитывается за определенный промежуток времени timeInterval.
 * Работает в двух режимах:
 * - фиксированный промежуток времени (нужно определить fixedTimeInterval)
 * - вычисляемый промежуток времени (режим по умолчанию)
 */
export class MoveCommand implements ICommand {
	/**
	 * Конструктор команды поступательного движения.
	 * @param movable Движущийся объект.
	 * @param fixedTimeInterval Задать фиксированный интервал времени. В миллисекундах.
	 * Используется для варианта игрового цикла с фиксированным шагом.
	 */
	public constructor(
		private movable: ITransformable & IRigidBody & IMovable,
		private fixedTimeInterval?: number
	) {}

	public execute(): void {
		const currentTime = Date.now()
		const {movableTime = currentTime} = this.movable
		const timeInterval = currentTime - movableTime

		// Если фиксированный интервал задан, то выполняем вычисления не чаще этого значения.
		if (this.fixedTimeInterval && timeInterval < this.fixedTimeInterval) return

		const {mass, position, linearAcceleration, linearVelocity, appliedMotionForce} = this.movable
		this.movable.linearAcceleration = appliedMotionForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(Convert.toSecond(timeInterval)))
		this.movable.position = position.translate(linearVelocity.scale(Convert.toSecond(timeInterval)))

		this.movable.movableTime = currentTime
	}
}