import {IQueue} from './Queue';

export default interface ICommand {
	/**
	 * Выполнить команду.
	 */
	execute(): void

	/**
	 * Ссылка на очередь команд.
	 */
	commandQueue?: IQueue<ICommand>

	/**
	 * Имя команды.
	 * Используется в отладочных целях.
	 */
	readonly name: string

	// TODO Может стоить добавить description? Чтобы name содержало идентификатор, а все пояснения были в description.
}