import {ICommand} from 'khusamov-base-types';
import IMovable from '../IMovable';

export type TMoveTransformAction = (movable: IMovable) => void

// TODO Эту команду надо удалить и вместо нее использовать RelayCommand
//  Перед этим в README.md надо прописать пример использования RelayCommand для изменения движения объекта.

/**
 * Команда изменения параметров поступательного движения.
 * Используйте RelayCommand.
 *
 * Например, если пространство является тором, то можно исправлять координаты.
 * Или команда увеличения приложенной к объекту силы.
 * @deprecated
 */
export default class MoveTransformCommand implements ICommand {
	public readonly name = 'MoveTransformCommand'

	public constructor(
		private movable: IMovable,
		private transform: TMoveTransformAction
	) {}

	public execute(): void {
		this.transform(this.movable)
	}
}