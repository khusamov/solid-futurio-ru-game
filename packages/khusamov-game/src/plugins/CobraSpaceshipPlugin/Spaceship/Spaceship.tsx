import {MovableAdapter, RigidBodyAdapter, RotableAdapter, TransformableAdapter} from 'khusamov-mechanical-motion';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {Transform, Vector} from 'khusamov-base-types';
import {SpaceshipStyle, AppliedRotationalForceStyle, AppliedEngineForceStyle, MassCenter, SpaceshipImageStyle, AppliedMotionForceStyle} from './Spaceship.module.scss'
import {CobraSpaceshipAdapter} from '../ICobraSpaceship/CobraSpaceshipAdapter';

const forceRenderScale = 1 / 50

const path = (distanceBetweenEngines: number) => `
	M 0, 0
	L ${distanceBetweenEngines / 2}, 0 
	L 0, ${distanceBetweenEngines * 2} 
	L -${distanceBetweenEngines / 2}, 0 
	Z
`

interface ISpaceshipProps {
	object: IUniversalObject
}

export default function Spaceship({object}: ISpaceshipProps) {
	const {
		position, rotation, appliedMotionForce, appliedRotationalForce, appliedRotationalForcePoint,
		appliedLeftForce, appliedRightForce, distanceBetweenEngines
	} = (
		createAdapter(
			object,
			CobraSpaceshipAdapter,
			MovableAdapter,
			RotableAdapter,
			RigidBodyAdapter,
			TransformableAdapter
		)
	)
	const {x, y} = position
	const spaceshipImageTransform = (
		new Transform()
			// Поворачиваем изображение корабля по вектору rotation.
			// Поворот Math.PI/2 это из-за того, что он нарисован под 90 градусов наверх.
			.rotate(rotation.angle -  Math.PI/2)
	)

	const appliedMotionForceTransform = (
		new Transform()
			.rotate(appliedMotionForce.angle)
	)

	const appliedRotationalForceTransform = (
		new Transform()
			// Смещаем приложенную силу в точку ее приложения.
			.translate(appliedRotationalForcePoint)
			.rotate(appliedRotationalForce.angle)
	)

	const appliedLeftForceTransform = (
		new Transform()
			.rotate(appliedLeftForce.angle)
			.translate(new Vector(0, -distanceBetweenEngines / 2))
	)

	const appliedRightForceTransform = (
		new Transform()
			.rotate(appliedRightForce.angle)
			.translate(new Vector(0, distanceBetweenEngines / 2))
	)

	return (
		<g className={SpaceshipStyle} transform={`translate(${x}, ${y})`}>
			<g className={SpaceshipImageStyle} transform={spaceshipImageTransform.toString()}>
				<path d={path(distanceBetweenEngines)}/>
			</g>
			<circle r={2} className={MassCenter}/>
			<line
				className={AppliedMotionForceStyle}
				transform={appliedMotionForceTransform.toString()}
				x1={0} y1={0}
				x2={appliedMotionForce.length * forceRenderScale} y2={0}
			/>
			<line
				className={AppliedRotationalForceStyle}
				transform={appliedRotationalForceTransform.toString()}
				x1={0} y1={0}
				x2={appliedRotationalForce.length * forceRenderScale} y2={0}
			/>
			<line
				className={AppliedEngineForceStyle}
				transform={appliedLeftForceTransform.toString()}
				x1={0} y1={0}
				x2={-appliedLeftForce.length * forceRenderScale} y2={0}
			/>
			<line
				className={AppliedEngineForceStyle}
				transform={appliedRightForceTransform.toString()}
				x1={0} y1={0}
				x2={-appliedRightForce.length * forceRenderScale} y2={0}
			/>
		</g>
	)
}

