import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

const toSecond = (millisecond: number) => millisecond / 1000

/**
 * Поступательное движение.
 * Рассчитывается за определенный промежуток времени.
 */
export default class MoveCommand implements ICommand {
	public readonly name = 'MoveCommand'

	/**
	 * Конструктор команды поступательного движения.
	 * @param movable Движущийся объект.
	 * @param fixedTimeInterval Задать фиксированный интервал времени. В миллисекундах.
	 * Используется для варианта игрового цикла с фиксированным шагом.
	 */
	constructor(
		private movable: IMovable,
		private fixedTimeInterval?: number
	) {}

	public execute(): void {
		const currentTime = Date.now()
		const {time = currentTime, mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable

		const timeInterval = this.fixedTimeInterval ? this.fixedTimeInterval : currentTime - time

		this.movable.time = currentTime
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(toSecond(timeInterval)))
		this.movable.position = position.translate(linearVelocity.scale(toSecond(timeInterval)))
	}
}