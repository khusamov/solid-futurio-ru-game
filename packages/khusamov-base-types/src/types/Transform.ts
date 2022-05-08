import Vector from './Vector';
import Angle from './Angle';

export default class Transform {
	private transforms: string[] = []

	public scale({x, y}: Vector): this {
		this.transforms.push(`scale(${x}, ${y})`)
		return this
	}

	public rotate(angle: number): this {
		this.transforms.push(`rotate(${Angle.toDegree(angle)})`)
		return this
	}

	public translate({x, y}: Vector): this {
		this.transforms.push(`translate(${x}, ${y})`)
		return this
	}

	public toString(): string {
		return this.transforms.join(', ')
	}
}