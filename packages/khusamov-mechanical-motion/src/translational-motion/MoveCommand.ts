import {Convert, ICommand} from 'khusamov-base-types';
import IMovable from '../IMovable';

/**
 * Поступательное движение.
 *
 * Рассчитывается за определенный промежуток времени timeInterval.
 * Работает в двух режимах:
 * - фиксированный промежуток времени (нужно определить fixedTimeInterval)
 * - вычисляемый промежуток времени (режим по умолчанию)
 */
export default class MoveCommand implements ICommand {
	public readonly name = 'MoveCommand'

	/**
	 * Конструктор команды поступательного движения.
	 * @param movable Движущийся объект.
	 * @param fixedTimeInterval Задать фиксированный интервал времени. В миллисекундах.
	 * Используется для варианта игрового цикла с фиксированным шагом.
	 */
	public constructor(
		private movable: IMovable, // TODO Добавить ITransformable
		private fixedTimeInterval?: number
	) {}

	public execute(): void {
		const currentTime = Date.now()
		const {time = currentTime} = this.movable
		const timeInterval = currentTime - time

		// Если фиксированный интервал задан, то выполняем вычисления не чаще этого значения.
		if (this.fixedTimeInterval && timeInterval < this.fixedTimeInterval) return

		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(Convert.toSecond(timeInterval)))
		this.movable.position = position.translate(linearVelocity.scale(Convert.toSecond(timeInterval)))

		this.movable.time = currentTime
	}
}