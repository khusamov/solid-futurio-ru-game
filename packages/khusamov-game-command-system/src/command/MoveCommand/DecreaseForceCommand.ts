import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export default class DecreaseForceCommand implements ICommand {
	constructor(
		private movable: IMovable,
		private forceDecrement: number = 10
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.scale(1 / this.forceDecrement)
	}
}