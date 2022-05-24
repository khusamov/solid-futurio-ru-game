import {Convert} from 'khusamov-base-types';
import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {
	IMovable,
	IRigidBody, IRotable,
	ITransformable,
	MovableAdapter,
	RigidBodyAdapter,
	RotableAdapter,
	TransformableAdapter
} from 'khusamov-mechanical-motion';
import GameObjectAdapter from '../../GlobalGameObjectPlugin/IGameObject/GameObjectAdapter';
import {ParamTableStyle} from './Params.module.scss';
import {CobraSpaceshipAdapter} from '../ICobraSpaceship/CobraSpaceshipAdapter';
import {ICobraSpaceship} from '../ICobraSpaceship/ICobraSpaceship';

interface IParam {
	title: string
	value: string
	unit: string
	color?: string
	valueAlt?: string
}

interface IParamsProps {
	object: IUniversalObject
	additionalParameters?: IParam[]
}

export default function Params({object, additionalParameters = []}: IParamsProps) {
	const gameObject = new GameObjectAdapter(object)

	if (gameObject.kind.includes('IMovable')) {
		const movable = (
			createAdapter(
				object,
				CobraSpaceshipAdapter,
				MovableAdapter,
				RotableAdapter,
				RigidBodyAdapter,
				TransformableAdapter
			)
		)
		const params = [...getMovableParams(movable), ...additionalParameters]
		return (
			<div className={ParamTableStyle}>
				<table>
					<tbody>
						{params.map((param, index) => (
							<tr key={index} style={{color: param.color}}>
								<td>{param.title}:</td>
								<td>{param.value}</td>
								<td>{param.valueAlt}</td>
								<td>{param.unit}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}

	return null
}

type THeroSpaceship = ICobraSpaceship & ITransformable & IRigidBody & IMovable & IRotable

function getMovableParams(movable: THeroSpaceship): IParam[] {
	return [{
		title: 'Сила движения',
		value: `${movable.appliedMotionForce.length.toFixed(2)} / ${Convert.toDegree(movable.appliedMotionForce.angle).toFixed(2)}`,
		unit: 'Ньютон / Градус',
		color: 'cyan'
	}, {
		title: 'Ускорение',
		value: movable.linearAcceleration.toString(),
		valueAlt: movable.linearAcceleration.length.toFixed(2),
		unit: 'Метры в секунду в квадрате'
	}, {
		title: 'Скорость',
		value: movable.linearVelocity.toString(),
		valueAlt: movable.linearVelocity.length.toFixed(2),
		unit: 'Метры в секунду'
	}, {
		title: 'Координаты',
		value: movable.position.toString(),
		unit: 'Метры'
	}, {
		title: 'Сила вращения',
		value: `${movable.appliedRotationalForce.length.toFixed(2)} / ${Convert.toDegree(movable.appliedRotationalForce.angle).toFixed(2)}`,
		unit: 'Ньютон / Градус',
		color: 'red'
	}, {
		title: 'Плечо крутящего момента',
		value: `${movable.appliedRotationalForcePoint.length.toFixed(2)} / ${Convert.toDegree(movable.appliedRotationalForcePoint.angle).toFixed(2)}`,
		unit: 'Метры / Градус'
	}, {
		title: 'Момент инерции (аналог массы)',
		value: Convert.toDegree(movable.rotationalInertia).toFixed(2),
		unit: 'Килограмм на метр в квадрате'
	}, {
		title: 'Момент силы (аналог силы)',
		value: movable.torque.toString(),
		unit: 'Ньютон на метр'
	}, {
		title: 'Угловое ускорение',
		value: Convert.toDegree(movable.angularAcceleration).toFixed(2),
		unit: 'Градусы в секунду в квадрате'
	}, {
		title: 'Угловая скорость',
		value: Convert.toDegree(movable.angularVelocity).toFixed(2),
		unit: 'Градусы в секунду'
	}, {
		title: 'Угол корабля',
		value: Convert.toDegree(movable.rotation.angle).toFixed(2),
		unit: 'Градус',
		color: 'blue'
	}]
}