import {ICommandOrder, TOrderQueue} from 'khusamov-command-system';
import {Queue, QueueLog} from 'khusamov-base-types';

export default function createOrderQueue(LOG: boolean): TOrderQueue {
	if (LOG) {
		const [orderQueue, orderQueueLog] = QueueLog.create<ICommandOrder>(new Queue)
		Object.defineProperty(window, 'orderQueueLog', {value: orderQueueLog})
		return orderQueue
	} else {
		return new Queue
	}
}