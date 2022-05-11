import {ICommand} from 'khusamov-base-types';
import IMovable from '../interfaces/IMovable';

export default class RotateForceCommand implements ICommand {
	public readonly name = 'RotateForceCommand'

	public constructor(
		private readonly movable: IMovable,
		private readonly increment: number
	) {}

	public execute(): void {
		this.movable.appliedForce = this.movable.appliedForce.rotate(this.increment)
	}
}