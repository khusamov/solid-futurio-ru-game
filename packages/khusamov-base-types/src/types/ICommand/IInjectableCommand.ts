import ICommand from './ICommand';

/**
 * Команда, которая выполняет другую команду.
 */
export default interface IInjectableCommand extends ICommand {
	/**
	 * Внедрить команду.
	 * @param internalCommand
	 */
	inject(internalCommand: ICommand): void
}