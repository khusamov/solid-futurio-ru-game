export default interface IQueue<T> {
	enqueue(...items: T[]): void
	dequeue(): T | undefined
	readonly items: Readonly<Array<T>>
}