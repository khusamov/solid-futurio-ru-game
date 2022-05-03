import {useEffect, useRef} from 'react';

export default function useRequestAnimationFrame() {
	const frame = useRef(0)
	const render = (time: DOMHighResTimeStamp) => {
		frame.current = requestAnimationFrame(render)
	}
	useEffect(() => {
		frame.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(frame.current)
	}, [])
}