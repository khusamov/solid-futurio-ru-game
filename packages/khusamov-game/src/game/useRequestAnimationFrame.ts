import {useEffect, useRef, useState} from 'react';

export default function useRequestAnimationFrame() {
	const [time, setTime] = useState(0)

	const frame = useRef(0)

	const render = (time: DOMHighResTimeStamp) => {
		setTime(time)
		frame.current = requestAnimationFrame(render)
	}

	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])

	return [time]
}