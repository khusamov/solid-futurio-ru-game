import styles from './Params.module.scss';
import {Angle} from 'khusamov-base-types';
import Game from '../../game/Game';
import {IMovable} from 'khusamov-game-command-system';

interface IParam {
	title: string
	value: string
	unit: string
	color?: string
}

interface IParamsProps {
	game: Game
	theSpaceship: IMovable
}

export default function Params({game, theSpaceship}: IParamsProps) {
	const params: IParam[] = [{
		title: 'Время',
		value: new Date(game.gameTimer.interval).getMinutes() + ':' + new Date(game.gameTimer.interval).getSeconds(),
		unit: ''
	}, {
		title: 'Координаты',
		value: theSpaceship.position.toString(),
		unit: 'Метры'
	}, {
		title: 'Скорость',
		value: theSpaceship.linearVelocity.toString(),
		unit: 'Метры в секунду',
		color: 'blue'
	}, {
		title: 'Ускорение',
		value: theSpaceship.linearAcceleration.toString(),
		unit: 'Метры в секунду в квадрате'
	}, {
		title: 'Сила',
		value: `${theSpaceship.appliedForce.length.toFixed(2)}, ${Angle.toDegree(theSpaceship.appliedForce.angle).toFixed(2)}`,
		unit: 'Ньютон, градус',
		color: 'red'
	}]

	return (
		<table className={styles.Params}>
			{params.map(param => (
				<tr style={{color: param.color}}>
					<td>{param.title}:</td>
					<td>{param.value}</td>
					<td>{param.unit}</td>
				</tr>
			))}
		</table>
	)
}