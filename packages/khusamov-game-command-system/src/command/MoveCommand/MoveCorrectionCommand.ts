import {ICommand} from 'khusamov-base-types';
import IMovable from './IMovable';

export type TCorrectMovableAction = (movable: IMovable) => void

/**
 * Команда изменения параметров поступательного движения.
 * 
 * Например если игровое пространство является тором, 
 * то можно добавить исправление координат объекта.
 */
export default class MoveCorrectionCommand implements ICommand {
	readonly name: string = 'MoveCorrectionCommand'

	/**
	 * Конструктор команды изменения параметров поступательного движения.
	 * @param movable Объект с параметрами.
	 * @param correctMovable Скрипт, который изменяет параметры.
	 */
	constructor(
		private movable: IMovable,
		private correctMovable: TCorrectMovableAction
	) {}

	execute(): void {
		this.correctMovable(this.movable)
	}
}