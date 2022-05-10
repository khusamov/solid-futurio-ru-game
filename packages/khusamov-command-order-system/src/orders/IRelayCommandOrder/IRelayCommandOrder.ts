import {TResolveParameters} from 'khusamov-inversion-of-control';
import ICommandOrder from '../ICommandOrder';

export default interface IRelayCommandOrder<A extends TResolveParameters, T extends string = 'RelayCommand'> extends ICommandOrder {
	/**
	 * Тип приказа. По умолчанию равен RelayCommand.
	 * Есть возможность расширять данный приказ (наследовать от него другой интерфейс приказа).
	 * Тип приказа можно менять в дочерних приказах, изменяя типовой аргумент T.
	 */
	readonly type: T

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