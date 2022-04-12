export default interface IEventEmitter {
	on(eventName: string | symbol, listener: (...args: any[]) => void): this
}