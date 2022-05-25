import {useEffect, useRef, useState} from 'react';

export type TRaf = typeof window.requestAnimationFrame
export type TUpdateFunction = (timeInterval: DOMHighResTimeStamp) => void

const updatePerSecond = 10
const updateFixedTimeInterval = 1 / updatePerSecond * 1000

/**
 * Фиксированный шаг между кадрами: Гарантирует постоянный интервал для update().
 *
 * @param update Функция обновления логики игры.
 * @param requestAnimationFrame
 */
export function useRequestAnimationFrame3(update: TUpdateFunction, requestAnimationFrame: TRaf = window.requestAnimationFrame): [number, number] {
	const frame = useRef(0)
	const [timeInterval, setTimeInterval] = useState(0)
	const previousTime = useRef(0)
	const updateTimeDelay = useRef(0)

	const render = (time: DOMHighResTimeStamp) => {
		const timeInterval = time - previousTime.current
		updateTimeDelay.current += timeInterval

		while (updateTimeDelay.current > updateFixedTimeInterval) {
			updateTimeDelay.current -= updateFixedTimeInterval
			// Функция update() вызывается с фиксированной частотой.
			update(updateFixedTimeInterval)
		}
		previousTime.current = time

		setTimeInterval(timeInterval) // render()
		frame.current = requestAnimationFrame(render)
	}

	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	const interpolationRatio = updateTimeDelay.current * updatePerSecond / 1000
	return [interpolationRatio, timeInterval]
}