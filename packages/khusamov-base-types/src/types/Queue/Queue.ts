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
export default class Queue<T> implements IQueue<T> {
	protected storage: Array<T> = [];

	constructor() {}

	enqueue(...items: T[]): void {
		this.storage.push(...items);
	}

	dequeue(): T | undefined {
		return this.storage.shift();
	}

	size(): number {
		return this.storage.length;
	}
}