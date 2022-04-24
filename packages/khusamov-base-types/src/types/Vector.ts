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

	/**
	 * Создать вектор на основе угла и длины.
	 */
	public static create(angle: number, length: number): Vector {
		return new Vector(
			length * Math.cos(angle),
			length * Math.sin(angle)
		)
	}

	public constructor(
		public x: number = 0,
		public y: number = 0
	) {}

	/**
	 * Получить единичный вектор, равный по направлению исходному.
	 * Он же направляющий вектор (единичный, равный по направлению).
	 * Создается новый вектор, а исходный вектор не меняется.
	 */
	public get identity(): Vector {
		const clone = this.clone()
		clone.length = 1
		return clone
	}

	/**
	 * Сложение векторов.
	 * @param vector
	 */
	public translate(vector: Vector): Vector {
		return new Vector(
			this.x + vector.x,
			this.y + vector.y
		)
	}

	/**
	 * Вращение вектора.
	 * @param angle
	 */
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
	 * Скалярное произведение векторов.
	 * @param vector
	 */
	public multiply(vector: Vector): Vector {
		return new Vector(
			this.x * vector.x,
			this.y * vector.y
		)
	}

	/**
	 * Взятие остатка от деления.
	 * @param vector
	 */
	public mod(vector: Vector): Vector {
		return new Vector(
			this.x % vector.x,
			this.y % vector.y
		)
	}

	/**
	 * Инверсия вектора (обратный вектор).
	 */
	public inverse() {
		return new Vector(-this.x, -this.y)
	}

	/**
	 * Угол между вектором и положительной осью.
	 */
	public get angle(): number {
		return Math.atan2(this.y, this.x)
	}

	public set angle(angle: number) {
		this.x = this.length * Math.cos(angle)
		this.y = this.length * Math.sin(angle)
	}

	/**
	 * Модуль (длина) вектора.
	 */
	public get length(): number {
		return Vector.distance(this)
	}

	public set length(length: number) {
		const angle = this.angle
		this.x = length * Math.cos(angle)
		this.y = length * Math.sin(angle)
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