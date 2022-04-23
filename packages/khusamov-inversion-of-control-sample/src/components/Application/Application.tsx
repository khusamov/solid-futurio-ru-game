import Canvas from '../Canvas';
import Game from '../../game/Game';
import {Angle, Timer} from 'khusamov-base-types';
import {useState} from 'react';
import {resolve} from 'khusamov-inversion-of-control';
import {IMovable, IMovableReflectedTypeRef} from 'khusamov-game-command-system';
import createSpaceship from '../../game/createSpaceship';

interface IParam {
	title: string
	value: string
	unit: string
}

const game = new Game()
game.start()

export default function Application() {
	const [theSpaceship, setTheSpaceship] = (
		useState(
			resolve<IMovable>(
				'Adapter',
				// Пустой корабль, просто используется как начальное значение состояния.
				// Далее он заменяется на реальный корабль.
				createSpaceship(),
				IMovableReflectedTypeRef)
		)
	)

	// Специальный таймер обновления экрана.
	// По идее вместо него надо просто подписаться на изменения объектов
	// в массиве gameObjectList из объекта game.
	const [timer] = useState(
		new Timer(10, () => {
			const theSpaceship = resolve<IMovable>('Adapter', game.theSpaceship, IMovableReflectedTypeRef)
			setTheSpaceship(theSpaceship)
		})
	)

	timer.start() // TODO Избавиться от этого вызова start() - так как он вызывается на каждый рендеринг, а должен быть вызван один раз!

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