import IStartable from './IStartable';
import IStoppable from './IStoppable';

export type TAction = (this: Timer) => void

export default class Timer implements IStartable, IStoppable {
	private timerId: number | undefined
	private time: Date | undefined

	/**
	 * Внимание, внутри action определена this как Timer.
	 * @param timeout
	 * @param action
	 */
	constructor(
		private timeout: number,
		private action: TAction
	) {}

	public start() {
		if (this.timerId === undefined) {
			this.timerId = window.setInterval(this.action.bind(this), this.timeout)
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