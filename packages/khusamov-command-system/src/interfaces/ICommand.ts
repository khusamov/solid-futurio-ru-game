import {IAbstractCommand, IQueue} from 'khusamov-base-types';

/**
 * Команда.
 */
export interface ICommand extends IAbstractCommand {
	/**
	 * Ссылка на очередь команд.
	 * Определяется непосредственно перед помещением команды в очередь команд.
	 */
	commandQueue?: IQueue<ICommand>
}