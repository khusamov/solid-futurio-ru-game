import {EffectCallback, useEffect, useRef, useState} from 'react';

export type TRaf = typeof window.requestAnimationFrame
export type TUpdateFunction = (timeInterval: DOMHighResTimeStamp) => void

const updatePerSecond = 60
const updateFixedTimeInterval = 1 / updatePerSecond * 1000

function useUpdatedRef<T>(value: T) {
	const ref = useRef<T>(value)
	ref.current = value
	return ref
}

const useSingleEffect = (effect: EffectCallback) => useEffect(effect, [])

/**
 * Фиксированный шаг между кадрами: Гарантирует постоянный интервал для update().
 *
 * @param update Функция обновления логики игры.
 * @param slowMotionFactor Коэффициент замедления вызова update().
 * @param requestAnimationFrame
 */
export function useRequestAnimationFrame4(
	update: TUpdateFunction,
	slowMotionFactor: number,
	requestAnimationFrame: TRaf = window.requestAnimationFrame
): [number, number] {
	const [timeInterval, setTimeInterval] = useState(0)
	const frameRef = useRef(0)
	const previousTimeRef = useRef(0)
	const updateTimeDelayRef = useRef(0)
	const slowMotionFactorRef = useUpdatedRef(slowMotionFactor)
	useSingleEffect(
		() => {
			const render = (time: DOMHighResTimeStamp) => {
				const timeInterval = time - previousTimeRef.current
				updateTimeDelayRef.current += timeInterval

				while (updateTimeDelayRef.current > updateFixedTimeInterval * slowMotionFactorRef.current) {
					updateTimeDelayRef.current -= updateFixedTimeInterval * slowMotionFactorRef.current
					// Функция update() вызывается с фиксированной частотой.
					update(updateFixedTimeInterval)
				}
				previousTimeRef.current = time

				setTimeInterval(timeInterval) // render()
				frameRef.current = requestAnimationFrame(render)
			}
			frameRef.current = requestAnimationFrame(render)
			return () => cancelAnimationFrame(frameRef.current)
		}
	)

	const interpolationRatio = (updateTimeDelayRef.current / slowMotionFactorRef.current) * updatePerSecond / 1000
	return [interpolationRatio, timeInterval]
}