import {Fragment} from 'react'
import {TUpdateFunction, useRequestAnimationFrame3} from './useRequestAnimationFrame3';
import {toRadian} from '../../../functions/toRadian';
import {toDegree} from '../../../functions/toDegree';
import {Canvas} from '../../svg/Canvas';
import {RequestAnimationFrameEmulator} from '../RequestAnimationFrameEmulator';
import {Control} from '../Control';
import {lerp} from '../../../functions/lerp';

const raf = new RequestAnimationFrameEmulator

let size = 100
let previousAngle = 0
let angle = 0
let count = 0

const update: TUpdateFunction = timeInterval => {
	previousAngle = angle
	// Здесь мы скорость зададим такую же как в GameLoop1, то есть 60 градусов в секунду.
	// Нам известен timeInterval, которые определяет время, прошедшее с предыдущего вызова функции update().
	// Значит приращение угла равно timeInterval помножить на 60.
	// Так как timeInterval измеряется в миллисекундах, то еще надо поделить на 1000.
	angle += toRadian(timeInterval / 1000 * 60)
	count += angle >= toRadian(360) ? 1 : 0
	angle = angle % (Math.PI * 2)
}

export function GameLoop3() {
	const [interpolationRatio] = useRequestAnimationFrame3(update, raf.requestAnimationFrame)
	const onFramePerSecondChange = (framePerSecond: number) => {
		raf.framePerSecond = framePerSecond
	}
	const _angle = lerp(previousAngle, angle, interpolationRatio)
	return (
		<Fragment>
			<Canvas>
				<g transform={`rotate(${toDegree(_angle)})`}>
					<rect transform={`translate(-${size / 2}, -${size / 2})`} width={size} height={size}/>
				</g>
			</Canvas>
			<Control
				description='Фиксированный шаг между вызовами update() + LERP'
				onFramePerSecondChange={onFramePerSecondChange}
			>
				<div>Обороты: {count}</div>
			</Control>
		</Fragment>
	)
}