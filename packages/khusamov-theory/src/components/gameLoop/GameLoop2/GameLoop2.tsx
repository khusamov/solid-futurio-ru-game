import {Fragment} from 'react'
import {TUpdateFunction, useRequestAnimationFrame2} from './useRequestAnimationFrame2';
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

export function GameLoop2() {
	useRequestAnimationFrame2(update, raf.requestAnimationFrame)
	const onFramePerSecondChange = (framePerSecond: number) => {
		raf.framePerSecond = framePerSecond
	}
	return (
		<Fragment>
			<Canvas>
				<g transform={`rotate(${toDegree(angle)})`}>
					<rect transform={`translate(-${size / 2}, -${size / 2})`} width={size} height={size}/>
				</g>
			</Canvas>
			<Control
				description='Вычисляется интервал вызовов update()'
				onFramePerSecondChange={onFramePerSecondChange}
			>
				<div>Обороты: {count}</div>
			</Control>
		</Fragment>
	)
}