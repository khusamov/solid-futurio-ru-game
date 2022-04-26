import {ICommand, Vector} from 'khusamov-base-types';
import IMovable from './IMovable';

/**
 * Поступательное движение.
 * Рассчитывается за определенный промежуток времени.
 */
export default class MoveCommand implements ICommand {
	public readonly name = 'MoveCommand'

	/**
	 * Конструктор команды поступательного движения.
	 * @param movable Движущийся объект.
	 */
	constructor(
		private movable: IMovable
	) {}

	public execute(): void {
		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(this.timeInterval))
		this.movable.position = position.translate(linearVelocity)
	}

	private get timeInterval(): number {
		const currentTime = new Date().getTime()
		const timeInterval = (currentTime - this.movable.time) / 1000
		this.movable.time = currentTime
		return timeInterval
	}
}