import IPoint from './IPoint';

/**
 * @link https://github.com/khusamov/extjs-cad-2d/blob/master/packages/local/khusamov-svg/src/geometry/vector/Vector.js
 * @link https://github.com/khusamov/extjs-cad-2d/blob/master/packages/local/khusamov-svg/src/geometry/Point.js
 */
export default class Vector implements IPoint {
	/**
	 * Расстояние от начала координат до точки.
	 */
	public static distance(point: IPoint): number {
		// noinspection JSSuspiciousNameCombination
		return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
	}

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

	/**
	 * Умножение вектора на число.
	 */
	public scale(scale: number) {
		return new Vector(this.x * scale, this.y * scale);
	}

	/**
	 * Модуль (длина) вектора.
	 */
	get length(): number {
		return Vector.distance(this)
	}

	set length(length: number) {
		// noinspection JSSuspiciousNameCombination
		const scale = length * Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		this.x /= scale
		this.y /= scale
	}

	public toString() {
		const digits = 2
		return `[${this.x.toFixed(digits)}, ${this.y.toFixed(digits)}]`
	}

	public toArray() {
		return [this.x, this.y]
	}

	public clone() {
		return new Vector(this.x, this.y)
	}
}