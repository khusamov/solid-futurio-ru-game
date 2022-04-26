export default interface IQueue<T> {
	enqueue(item: T): void
	dequeue(): T | undefined
	readonly items: Readonly<Array<T>>
}