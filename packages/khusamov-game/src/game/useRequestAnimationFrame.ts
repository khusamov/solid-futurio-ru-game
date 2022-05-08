import {useEffect, useRef, useState} from 'react';

/**
 * Бесконечный запрос кадров анимации для текущего компонента.
 * Если компонент уничтожается, то запрос автоматически отменяется.
 * Возвращает мгновенный FPS и время с начала анимации в миллисекундах.
 */
export default function useRequestAnimationFrame(): [number, number] {
	const frame = useRef(0)
	const previousTime = useRef(0)
	const [time, setTime] = useState(0)
	const [framesPerSecond, setFramesPerSecond] = useState(0)

	const render = (time: DOMHighResTimeStamp) => {
		setFramesPerSecond(1000 / time - previousTime.current)
		setTime(time)
		previousTime.current = time
		frame.current = requestAnimationFrame(render)
	}

	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	return [framesPerSecond, time]
}