import {ICommand} from 'khusamov-base-types';
import IMovable from './MoveCommand/IMovable';

export default class IncreaseForceCommand implements ICommand {
	constructor(
		private movable: IMovable,
		private forceIncrement: number = 10
	) {}

	execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.scale(this.forceIncrement)
	}
}