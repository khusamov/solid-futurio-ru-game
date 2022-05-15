import {IQueue} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand} from '../interfaces';
import {TOrderQueue} from '../types';

/**
 * Интерпретация приказа от клиента.
 *
 * Приказ берется из очереди приказов 'OrderQueue' и конвертируется в команду.
 * Команда приказа размещается в очереди команд.
 * @link https://stepik.org/lesson/664251/step/1?unit=662137
 */
export class InterpretOrderCommand implements ICommand {
	public commandQueue?: IQueue<ICommand>

	public execute(): void {
		const order = resolve<TOrderQueue>('OrderQueue').dequeue()
		if (order) {
			const orderCommand = resolve<ICommand>(order.type, order)
			this.commandQueue?.enqueue(orderCommand)
		}
	}
}