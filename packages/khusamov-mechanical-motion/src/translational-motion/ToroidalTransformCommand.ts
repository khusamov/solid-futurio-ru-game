import {ICommand, ISize} from 'khusamov-base-types';
import transformPositionForToroid from '../functions/transformPositionForToroid';
import IMovable from '../IMovable';

export type TGetSize = () => ISize

export default class ToroidalTransformCommand implements ICommand {
	public readonly name = 'RotateForceCommand'

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