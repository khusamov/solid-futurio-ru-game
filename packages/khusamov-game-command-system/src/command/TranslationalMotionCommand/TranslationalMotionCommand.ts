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
		this.movable.linearAcceleration = this.movable.appliedForce.scale(1 / this.movable.mass)
		this.movable.linearVelocity = this.movable.linearVelocity.add(this.movable.linearAcceleration)
		this.movable.position = this.movable.position.add(this.movable.linearVelocity)
	}
}