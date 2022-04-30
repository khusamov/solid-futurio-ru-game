import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export type TTransformAction = (movable: IMovable) => void



// TODO khusamov-game-command-system заменить на khusamov-mechanical-movement
// TODO khusamov-inversion-of-control-sample заменить на khusamov-game
// TODO khusamov-game-command-system перенести в deprecated
// TODO khusamov-inversion-of-control-sample перенести в deprecated



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