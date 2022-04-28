import IStoppable from './IStoppable';
import IStartable from './IStartable';

/**
 * http://gs-studio.com/news-about-it/30703----javascript
 * https://eatdog.com.ua/assets/gamedev-slides/
 * https://www.youtube.com/watch?v=-gsjAz9jR3Y
 */
export default class GameLoop implements IStartable, IStoppable {
	private readonly fps = 60
	private readonly step: number = 1 / this.fps

	private deltaTime: number = 0
	private last: number = 0
	private now: number = 0

	public constructor(
		private update: (step: number) => void,
		private render: (deltaTime: number) => void
	) {}

	public start(): void {
		this.deltaTime = 0
		this.last = performance.now()
		requestAnimationFrame(this.frame.bind(this))
	}

	public stop(): void {

	}

	public pause(): void {

	}

	private frame() {
		this.now = performance.now()

		// Исправление проблемы неактивных вкладок.
		// Разрешить максимальную задержку между вызовами не более, чем 1 секунда.
		this.deltaTime = this.deltaTime + Math.min(1, (this.now - this.last) / 1000)

		while(this.deltaTime > this.step) {
			this.deltaTime = this.deltaTime - this.step
			this.update(this.step)
		}
		this.last = this.now

		this.render(this.deltaTime)
		requestAnimationFrame(this.frame.bind(this))
	}
}