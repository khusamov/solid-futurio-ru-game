import styles from './Params.module.scss'
import {IUniversalObject} from 'khusamov-universal-object';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import {IMovable, MovableAdapter} from 'khusamov-mechanical-motion';
import {Angle} from 'khusamov-base-types';

interface IParamsProps {
	object: IUniversalObject
}

export default function Params({object}: IParamsProps) {
	const gameObject = new GameObjectAdapter(object)

	if (gameObject.kind.includes('IMovable')) {
		const movable = new MovableAdapter(object)
		const params = getMovableParams(movable)
		return (
			<div className={styles.Params}>
				<table>
					{params.map(param => (
						<tr style={{color: param.color}}>
							<td>{param.title}:</td>
							<td>{param.value}</td>
							<td>{param.valueAlt}</td>
							<td>{param.unit}</td>
						</tr>
					))}
				</table>
			</div>
		)
	}

	return null
}

interface IParam {
	title: string
	value: string
	unit: string
	color?: string
	valueAlt?: string
}

function getMovableParams(movable: IMovable): IParam[] {
	return [{
		title: 'Координаты',
		value: movable.position.toString(),
		unit: 'Метры'
	}, {
		title: 'Скорость',
		value: movable.linearVelocity.toString(),
		valueAlt: movable.linearVelocity.length.toFixed(2),
		unit: 'Метры в секунду',
		color: 'blue'
	}, {
		title: 'Ускорение',
		value: movable.linearAcceleration.toString(),
		valueAlt: movable.linearAcceleration.length.toFixed(2),
		unit: 'Метры в секунду в квадрате'
	}, {
		title: 'Сила',
		value: `${movable.appliedForce.length.toFixed(2)} / ${Angle.toDegree(movable.appliedForce.angle).toFixed(2)}`,
		unit: 'Ньютон / Градус',
		color: 'red'
	}]
}