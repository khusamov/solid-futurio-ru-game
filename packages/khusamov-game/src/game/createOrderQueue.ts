import {TOrderQueue} from 'khusamov-command-order-system';
import {Queue, QueueLog} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';

export default function createOrderQueue(LOG: boolean): TOrderQueue {
	if (LOG) {
		const [orderQueue, orderQueueLog] = QueueLog.create<IUniversalObject>(new Queue)
		Object.defineProperty(window, 'orderQueueLog', {value: orderQueueLog})
		return orderQueue
	} else {
		return new Queue
	}
}