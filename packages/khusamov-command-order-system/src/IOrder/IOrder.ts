import {ITyped} from 'khusamov-base-types';

/**
 * Приказ, на основе которого создается команда ICommand.
 */
export default interface IOrder extends ITyped {
	// Внимание, здесь свойство type должен содержать имя зависимости, которая возвращает ICommand
	// и соответственно это имя должно оканчиваться на префикс Command, например {type: 'RelayCommand'}.
}