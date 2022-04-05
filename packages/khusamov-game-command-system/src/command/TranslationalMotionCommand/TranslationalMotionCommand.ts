import {ICommand} from 'khusamov-base-types';
import ITranslationalMotion from './ITranslationalMotion';

/**
 * Поступательное движение.
 */
export default class TranslationalMotionCommand implements ICommand {
	constructor(
		private movable: ITranslationalMotion
	) {}

	public execute(): void {
		const timeInterval = 1
		const {mass, position, linearAcceleration, linearVelocity, appliedForce} = this.movable
		this.movable.linearAcceleration = appliedForce.scale(1 / mass)
		this.movable.linearVelocity = linearVelocity.add(linearAcceleration.scale(timeInterval))
		this.movable.position = position.add(linearVelocity)
	}
}