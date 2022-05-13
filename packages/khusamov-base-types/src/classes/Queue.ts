import {IQueue} from '../interfaces';

/**
 * Простая реализация очереди.
 */
export class Queue<T> implements IQueue<T> {
	private storage: Array<T> = []

	public enqueue(...items: T[]): void {
		this.storage.push(...items);
	}

	public dequeue(): T | undefined {
		return this.storage.shift()
	}

	public get items(): Readonly<Array<T>> {
		return this.storage
	}
}