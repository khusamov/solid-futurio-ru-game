import {ICommand} from 'khusamov-base-types';
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
		const currentTime = Date.now()
		const prevTime = this.movable.time || currentTime
		this.movable.time = currentTime
		// Промежуток времени в миллисекундах.
		const timeInterval = currentTime - prevTime

		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.translate(linearAcceleration.scale(timeInterval / 1000))
		this.movable.position = position.translate(linearVelocity.scale(timeInterval / 1000))
	}
}