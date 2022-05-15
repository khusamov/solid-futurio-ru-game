import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import {ICommandOrder} from '../../interfaces';

export interface IStartCommandOrder<R extends TResolver = TResolver, O extends ICommandOrder = ICommandOrder> extends ICommandOrder {
	readonly type: 'StartCommand'

	/**
	 * Параметры зависимости для вычисления объекта,
	 * для которого требуется запустить определенную команду.
	 */
	readonly targetObject: TResolveParameters<R>

	/**
	 * Имя, под котором данная команда будет сохранена в targetObject для того, чтобы
	 * по нему можно было бы ее остановить при помощи приказа IStopOrder.
	 */
	readonly commandName: string

	/**
	 * Приказ, который преобразуется в требуемую команду.
	 * Команда может быть RepeatableCommand или обычной. В последнем случае она будет обернута в RepeatableCommand.
	 */
	readonly command: O
}