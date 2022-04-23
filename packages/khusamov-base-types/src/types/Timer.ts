import IStartable from './IStartable';
import IStoppable from './IStoppable';

export default class Timer implements IStartable, IStoppable {
	private timerId: number | undefined
	private time: Date | undefined

	constructor(
		private timeout: number,
		private action: () => void
	) {}

	public start() {
		if (this.timerId === undefined) {
			this.timerId = window.setInterval(this.action, this.timeout)
			this.time = new Date
		}
	}

	public stop() {
		if (this.timerId !== undefined) {
			clearInterval(this.timerId)
			this.timerId = undefined
			this.time = undefined
		}
	}

	/**
	 * Количество миллисекунд с начала старта таймера.
	 */
	public get interval(): number {
		return this.time ? new Date().getTime() - this.time.getTime() : 0
	}
}