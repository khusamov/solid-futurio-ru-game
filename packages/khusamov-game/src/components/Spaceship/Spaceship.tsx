import {MovableAdapter, RigidBodyAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import SpaceshipImage from 'jsx:./SpaceshipImage.svg'
import {Convert, ISize, Transform, Vector} from 'khusamov-base-types';
import {SpaceshipStyle, AppliedForceStyle} from './Spaceship.module.scss'

const spaceshipImageSize: ISize = {
	width: 21,
	height: 38
}

interface ISpaceshipProps {
	object: IUniversalObject
}

export default function Spaceship({object}: ISpaceshipProps) {
	const {position, linearVelocity, appliedForce} = createAdapter(object,TransformableAdapter, RigidBodyAdapter, MovableAdapter)
	const {x, y} = position
	const transform = (
		new Transform()
			// Поворачиваем изображение корабля по вектору скорости.
			// Считаем, что в редакторе нос корабля смотрит строго наверх.
			.rotate(linearVelocity.rotate(Convert.toRadian(90)).angle)
			// Смещение изображения по центру.
			.translate(new Vector(spaceshipImageSize.width, spaceshipImageSize.height).scale(-1/2))
	)
	return (
		<g className={SpaceshipStyle} transform={`translate(${x}, ${y})`}>
			<g transform={transform.toString()}>
				<SpaceshipImage/>
			</g>
			<line
				className={AppliedForceStyle}
				x1={0} y1={0}
				x2={appliedForce.length / 50} y2={0}
				transform={`rotate(${Convert.toDegree(appliedForce.angle)})`}
			/>
		</g>
	)
}

