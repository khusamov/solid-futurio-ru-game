import {PropsWithChildren} from 'react'
import {CanvasStyle} from './Canvas.module.scss'
import useResizeObserver from 'use-resize-observer';

const mirrorY = (height: number) => `scale(1, -1), translate(0, -${height})`
const transform = (transforms: string[]) => transforms.join(', ')

interface ICanvasProps {

}

export function Canvas({children}: PropsWithChildren<ICanvasProps>) {
	const {ref, width = 0, height = 0} = useResizeObserver()
	const cameraTransform = [
		mirrorY(height),
		`translate(${width / 2}, ${height / 2})`
	]
	return (
		<div ref={ref} className={CanvasStyle}>
			<svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
				<g transform={transform(cameraTransform)}>
					{children}
				</g>
			</svg>
		</div>
	)
}