import {MovableAdapter} from 'khusamov-mechanical-motion';
import {IUniversalObject} from 'khusamov-universal-object';
import SpaceshipImage from './SpaceshipImage.svg'
import {Angle, ISize, Vector} from 'khusamov-base-types';

const spaceshipImageSize: ISize = {
	width: 21,
	height: 38
}

interface ISpaceshipProps {
	object: IUniversalObject
}

export default function Spaceship({object}: ISpaceshipProps) {
	const {position, linearVelocity} = new MovableAdapter(object)
	const {x, y} = position
	const transform = (
		new Transform()
			// Поворачиваем изображение корабля по вектору скорости.
			// Считаем, что в редакторе нос корабля смотрит строго наверх.
			.rotate(linearVelocity.rotate(Angle.toRadian(90)).angle)
			// Смещение изображения по центру.
			.translate(new Vector(spaceshipImageSize.width, spaceshipImageSize.height).scale(-1/2))
	)
	return (
		<g transform={`translate(${x}, ${y})`}>
			<g transform={transform.toString()}>
				<SpaceshipImage/>
			</g>
		</g>
	)
}

class Transform {
	private transforms: string[] = []
	public scale(value: number): this {
		this.transforms.push(`scale(${value})`)
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