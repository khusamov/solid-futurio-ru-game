import EventEmitter from 'events';
import IEventEmitter from '../IEventEmitter';
import IQueue from './IQueue';

/**
 * О́чередь — абстрактный тип данных с дисциплиной доступа к элементам «первый пришёл — первый вышел»
 * (FIFO, англ. first in, first out).
 *
 * Добавление элемента (принято обозначать словом enqueue — поставить в очередь) возможно лишь
 * в конец очереди, выборка — только из начала очереди (что принято называть словом dequeue — убрать из очереди),
 * при этом выбранный элемент из очереди удаляется.
 *
 * @link https://bit.ly/3tPM13G
 */
export default class Queue<T> implements IQueue<T>, IEventEmitter {
	private eventEmitter = new EventEmitter
	protected storage: Array<T> = []

	constructor() {}

	enqueue(...items: T[]): void {
		this.eventEmitter.emit('before-enqueue', this, ...items)
		this.storage.push(...items);
		this.eventEmitter.emit('enqueue', this, ...items)
	}

	dequeue(): T | undefined {
		const removed = this.storage.shift()
		this.eventEmitter.emit('dequeue', this, removed)
		return removed
	}

	size(): number {
		return this.storage.length
	}

	on(eventName: string | symbol, listener: (...args: any[]) => void): this {
		this.eventEmitter.on(eventName, listener)
		return this
	}
}