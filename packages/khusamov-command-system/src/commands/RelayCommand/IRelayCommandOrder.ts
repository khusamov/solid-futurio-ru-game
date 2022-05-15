import {TResolveParameters} from 'khusamov-inversion-of-control';
import {ICommandOrder} from '../../interfaces';

/**
 * Есть возможность расширять данный приказ. для этого предусмотрен второй типовой аргумент T.
 */
export interface IRelayCommandOrder<A extends TResolveParameters = TResolveParameters, T extends string = 'RelayCommand'> extends ICommandOrder<T> {
	/**
	 * Имя действия для RelayCommand.
	 */
	readonly name?: string

	/**
	 * Действие для RelayCommand.
	 * Определяется через массив:
	 * - Первый элемент это имя зависимости, которое вернет TAction.
	 * - Последующие элементы это параметры вычисления зависимости.
	 */
	readonly action: A
}