import {useEffect, useRef, useState} from 'react';

export type TRaf = typeof window.requestAnimationFrame
export type TUpdateFunction = () => void

/**
 * Простой и ненадёжный способ: Скорость игры напрямую зависит
 * от количества FPS (а точнее от частоты requestAnimationFrame).
 *
 * @param update Функция обновления логики игры.
 * @param requestAnimationFrame
 */
export function useRequestAnimationFrame1(update: TUpdateFunction, requestAnimationFrame: TRaf = window.requestAnimationFrame): [number] {
	const frame = useRef(0)
	const [timeInterval, setTimeInterval] = useState(0)
	const previousTime = useRef(0)

	const render = (time: DOMHighResTimeStamp) => {
		update()

		setTimeInterval(time - previousTime.current) // render()
		previousTime.current = time
		frame.current = requestAnimationFrame(render)
	}

	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	return [timeInterval]
}