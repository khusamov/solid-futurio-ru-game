/**
 * Override requestAnimationFrame to emulate different FPS count (same in all gameloop examples).
 */
export class RequestAnimationFrameEmulator {
	private timer = 0

	public constructor(public framePerSecond = 60) {}

	public requestAnimationFrame = (
		(callback: FrameRequestCallback): number => {
			clearTimeout(this.timer)
			this.timer = (
				setTimeout(
					() => callback(performance.now()),
					1000 / this.framePerSecond
				)
			)
			return 0
		}
	)
}