/**
 * Приказ, на основе которого создается команда ICommand.
 */
export interface ICommandOrder<T extends string = string> {
	/**
	 * Имя зависимости, которая возвращает ICommand и соответственно это имя
	 * должно оканчиваться на префикс Command, например {type: 'RelayCommand'}.
	 */
	type: T
}