import {ISize} from 'khusamov-base-types';
import {ICommand} from 'khusamov-command-system';
import {transformPositionForToroid} from '../../functions';
import {IMovable} from '../../interfaces';

export type TGetSize = () => ISize

export class ToroidalTransformCommand implements ICommand {
	public readonly name = 'ToroidalTransformCommand'

	public constructor(
		private readonly movable: IMovable,
		private readonly getToroidalSurfaceSize: TGetSize
	) {}

	public execute(): void {
		this.movable.position = (
			transformPositionForToroid(
				this.movable.position,
				this.getToroidalSurfaceSize()
			)
		)
	}
}