import Canvas from '../Canvas';
import {Angle} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {IMovable, IMovableReflectedTypeRef} from 'khusamov-game-command-system';
import {findGameObjectByName} from '../../game/findGameObject';
import useGame from '../../game/useGame';

interface IParam {
	title: string
	value: string
	unit: string
}

export default function Application() {
	const [game] = useGame({renderTimeout: 10, gameTimeout: 10})

	if (game) {
		const theSpaceshipObject = findGameObjectByName(game.gameObjectList, 'theSpaceship')
		const theSpaceship = theSpaceshipObject ? resolve<IMovable>('Adapter', theSpaceshipObject, IMovableReflectedTypeRef) : undefined

		if (theSpaceship) {
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
				unit: 'Метры в секунду'
			}, {
				title: 'Ускорение',
				value: theSpaceship.linearAcceleration.toString(),
				unit: 'Метры в секунду в квадрате'
			}, {
				title: 'Сила',
				value: `${theSpaceship.appliedForce.length.toFixed(2)}, ${Angle.toDegree(theSpaceship.appliedForce.angle).toFixed(2)}`,
				unit: 'Ньютон, градус'
			}]

			return (
				<div>
					<div>
						<table>
							{params.map(param => (
								<tr>
									<td>{param.title}:</td>
									<td>{param.value}</td>
									<td>{param.unit}</td>
								</tr>
							))}
						</table>
						<Canvas theSpaceshipPosition={theSpaceship.position}/>
					</div>
				</div>
			)
		}
	}
}