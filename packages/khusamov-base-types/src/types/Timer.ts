import IStartable from './IStartable';
import IStoppable from './IStoppable';

export default class Timer implements IStartable, IStoppable {
	private timerId: number | undefined

	constructor(
		private timeout: number,
		private action: () => void
	) {}

	public start() {
		if (this.timerId === undefined) {
			this.timerId = window.setInterval(this.action, this.timeout)
		}
	}

	public stop() {
		if (this.timerId !== undefined) {
			clearInterval(this.timerId)
			this.timerId = undefined
		}
	}
}