import {ICommand, IQueue} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {CommandOrderAdapter} from './orders/ICommandOrder';

/**
 * Очередь приказов это простая очередь IQueue,
 * где каждый элемент реализует интерфейс IUniversalObject.
 */
export type TOrderQueue = IQueue<IUniversalObject>

/**
 * Интерпретация приказа от клиента.
 *
 * Приказ берется из очереди приказов 'OrderQueue' и конвертируется в команду.
 * Команда приказа размещается в очереди команд.
 * @link https://stepik.org/lesson/664251/step/1?unit=662137
 */
export default class InterpretOrderCommand implements ICommand {
	public readonly name: string = 'InterpretOrderCommand'
	public commandQueue?: IQueue<ICommand>

	public execute(): void {
		const orderObject = resolve<TOrderQueue>('OrderQueue').dequeue()
		if (orderObject) {
			const order = new CommandOrderAdapter(orderObject)
			const orderCommand = resolve<ICommand>(order.type, orderObject)
			this.commandQueue?.enqueue(orderCommand)
		}
	}
}