import {Fragment} from 'react'
import {TUpdateFunction, useRequestAnimationFrame1} from './useRequestAnimationFrame1';
import {toRadian} from '../../../functions/toRadian';
import {toDegree} from '../../../functions/toDegree';
import {Canvas} from '../../svg/Canvas';
import {RequestAnimationFrameEmulator} from '../RequestAnimationFrameEmulator';
import {Control} from '../Control';

const raf = new RequestAnimationFrameEmulator

let size = 100
let angle = 0
let count = 0

const update: TUpdateFunction = () => {
	// Скорость вращения равна примерно 60 градусов в секунду. Потому что requestAnimationFrame
	// вызывает отрисовку примерно с частотой 60 кадров в секунду.
	angle += toRadian(1)
	count += angle >= toRadian(360) ? 1 : 0
	angle = angle % (Math.PI * 2)
}

export function GameLoop1() {
	useRequestAnimationFrame1(update, raf.requestAnimationFrame)
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
				description='Скорость логики зависит от FPS'
				onFramePerSecondChange={onFramePerSecondChange}
			>
				<div>Обороты: {count}</div>
			</Control>
		</Fragment>
	)
}