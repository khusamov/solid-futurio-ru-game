import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export type TTransformAction = (movable: IMovable) => void

/**
 * Команда изменения параметров поступательного движения.
 *
 * Например, если пространство является тором, то можно исправлять координаты.
 * Или команда увеличения приложенной к объекту силы.
 */
export default class MoveTransformCommand implements ICommand {
	public readonly name = 'MoveTransformCommand'

	public constructor(
		private movable: IMovable,
		private transform: TTransformAction
	) {}

	public execute(): void {
		this.transform(this.movable)
	}
}