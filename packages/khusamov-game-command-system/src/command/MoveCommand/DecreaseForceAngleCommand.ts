import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export default class DecreaseForceAngleCommand implements ICommand {
	constructor(
		private movable: IMovable,
		private forceAngleIncrement: number = 1
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.rotate(-this.forceAngleIncrement)
	}
}