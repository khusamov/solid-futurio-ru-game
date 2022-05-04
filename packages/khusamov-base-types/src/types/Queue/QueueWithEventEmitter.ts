import Queue from './Queue';
import IEventEmitter from '../IEventEmitter';
import EventEmitter from 'events';

export default class QueueWithEventEmitter<T> extends Queue<T> implements IEventEmitter {
	private eventEmitter = new EventEmitter

	public enqueue<I extends T = T>(...items: I[]): void {
		this.eventEmitter.emit('before-enqueue', this, ...items)
		super.enqueue(...items);
		this.eventEmitter.emit('enqueue', this, ...items)
	}

	public dequeue(): T | undefined {
		const removed = super.dequeue()
		this.eventEmitter.emit('dequeue', this, removed)
		return removed
	}

	public on(eventName: string | symbol, listener: (...args: any[]) => void): this {
		this.eventEmitter.on(eventName, listener)
		return this
	}
}