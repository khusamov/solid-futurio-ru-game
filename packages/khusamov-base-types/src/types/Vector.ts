export default class Vector {
	constructor(
		public x: number = 0,
		public y: number = 0
	) {}

	public add(vector: Vector): Vector {
		return new Vector(
			this.x + vector.x,
			this.y + vector.y
		)
	}

	public rotate(angle: number) {
		return new Vector(
			this.x * Math.cos(angle) - this.y * Math.sin(angle),
			this.x * Math.sin(angle) + this.y * Math.cos(angle)
		)
	}

	public toString() {
		const digits = 2
		return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`
	}

	public toArray() {
		return [this.x, this.y]
	}
}