import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';
import TransformForceCommand from './TransformForceCommand';

/**
 * Поступательное движение.
 * Рассчитывается за определенный промежуток времени.
 */
export default class MoveCommand implements ICommand {
	public readonly name = 'MoveCommand'

	constructor(
		private movable: IMovable
	) {}

	public execute(): void {
		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.add(linearAcceleration.scale(this.timeInterval))
		this.movable.position = position.add(linearVelocity)
	}

	private get timeInterval(): number {
		const currentTime = new Date().getTime()
		const timeInterval = (currentTime - this.movable.time) / 1000
		this.movable.time = currentTime
		return timeInterval
	}
}