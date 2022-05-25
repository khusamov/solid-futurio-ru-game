import {Fragment, useState} from 'react'
import {TUpdateFunction, useRequestAnimationFrame4} from './useRequestAnimationFrame4';
import {toRadian} from '../../../functions/toRadian';
import {toDegree} from '../../../functions/toDegree';
import {Canvas} from '../../svg/Canvas';
import {RequestAnimationFrameEmulator} from '../RequestAnimationFrameEmulator';
import {Control} from '../Control';

const raf = new RequestAnimationFrameEmulator

let size = 100
let angle = 0
let count = 0

const update: TUpdateFunction = timeInterval => {
	// Здесь мы скорость зададим такую же как в GameLoop1, то есть 60 градусов в секунду.
	// Нам известен timeInterval, которые определяет время, прошедшее с предыдущего вызова функции update().
	// Значит приращение угла равно timeInterval помножить на 60.
	// Так как timeInterval измеряется в миллисекундах, то еще надо поделить на 1000.
	angle += toRadian(timeInterval / 1000 * 60)
	count += angle >= toRadian(360) ? 1 : 0
	angle = angle % (Math.PI * 2)
}

export function GameLoop4() {
	const [slowMotionFactor, setSlowMotionFactor] = useState(1)
	useRequestAnimationFrame4(update, slowMotionFactor, raf.requestAnimationFrame)
	const onSlowMotionFactorChange = (slowMotionFactor: number) => setSlowMotionFactor(slowMotionFactor)
	return (
		<Fragment>
			<Canvas>
				<g transform={`rotate(${toDegree(angle)})`}>
					<rect transform={`translate(-${size / 2}, -${size / 2})`} width={size} height={size}/>
				</g>
			</Canvas>
			<Control
				description='Добавлено управление скоростью игры'
				onSlowMotionFactorChange={onSlowMotionFactorChange}
				slowMotionFactor={slowMotionFactor}
			>
				<div>Обороты: {count}</div>
			</Control>
		</Fragment>
	)
}