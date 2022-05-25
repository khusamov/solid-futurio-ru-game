import {ControlStyle} from './Control.module.scss'
import {ChangeEvent, useState, PropsWithChildren} from 'react';

interface IControlProps {
	description?: string
	onFramePerSecondChange?: (framePerSecond: number) => void
	onSlowMotionFactorChange?: (slowMotionFactor: number) => void
	slowMotionFactor?: number
}

export function Control({onFramePerSecondChange, onSlowMotionFactorChange, slowMotionFactor, description, children}: PropsWithChildren<IControlProps>) {
	return (
		<div className={ControlStyle}>
			{description && <div>{description}</div>}
			{children}
			{onFramePerSecondChange && <FramePerSecondInput onChange={onFramePerSecondChange}/>}
			{onSlowMotionFactorChange && slowMotionFactor && <SlowMotionFactorInput value={slowMotionFactor} onChange={onSlowMotionFactorChange}/>}
		</div>
	)
}

interface SlowMotionFactorProps {
	onChange: (framePerSecond: number) => void
	value: number
}

function SlowMotionFactorInput({onChange, value}: SlowMotionFactorProps) {
	const onInputChange = (
		(event: ChangeEvent<HTMLInputElement>) => {
			const slowMotionFactor = Number(event.target.value)
			onChange(slowMotionFactor)
		}
	)
	return (
		<div>
			<input id='smf' type='range' min={0.1} max={2} step={0.1} value={value} onChange={onInputChange}/>
			<label htmlFor='smf'>{value}</label>
		</div>
	)
}

interface FramePerSecondInputProps {
	onChange: (framePerSecond: number) => void
}

function FramePerSecondInput({onChange}: FramePerSecondInputProps) {
	const [framePerSecond, setFramePerSecond] = useState(60)
	const onInputChange = (
		(event: ChangeEvent<HTMLInputElement>) => {
			const framePerSecond = Number(event.target.value)
			setFramePerSecond(framePerSecond)
			onChange(framePerSecond)
		}
	)
	return (
		<div>
			<input id='fps' type='range' min={1} max={120} value={framePerSecond} onChange={onInputChange}/>
			<label htmlFor='fps'>{framePerSecond} FPS</label>
		</div>
	)
}