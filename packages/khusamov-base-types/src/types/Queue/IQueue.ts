export default interface IQueue<T> {
	enqueue<I extends T = T>(...items: I[]): void
	dequeue(): T | undefined
	readonly items: Readonly<Array<T>>
}