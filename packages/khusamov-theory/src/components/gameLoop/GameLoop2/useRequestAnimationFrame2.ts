import {useEffect, useRef, useState} from 'react';

export type TRaf = typeof window.requestAnimationFrame
export type TUpdateFunction = (timeInterval: DOMHighResTimeStamp) => void

/**
 * Подстраиваемся под частоту кадров: Скорость работы игры уже не зависит
 * от производительности (от частоты вызовов requestAnimationFrame).
 *
 * @param update Функция обновления логики игры.
 * @param requestAnimationFrame
 */
export function useRequestAnimationFrame2(update: TUpdateFunction, requestAnimationFrame: TRaf = window.requestAnimationFrame): [number] {
	const frame = useRef(0)
	const [timeInterval, setTimeInterval] = useState(0)
	const previousTime = useRef(0)

	const render = (time: DOMHighResTimeStamp) => {
		const timeInterval = time - previousTime.current
		// В отличии от предыдущей реализации игрового цикла, здесь в update передаем
		// время, которое прошло с предыдущего вызова update.
		// Это даст возможность создать игровую логику, которая зависит от времени,
		// а не от того как часто вызывается requestAnimationFrame.
		update(timeInterval)
		previousTime.current = time

		setTimeInterval(timeInterval) // render()
		frame.current = requestAnimationFrame(render)
	}

	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	return [timeInterval]
}