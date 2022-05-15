import {SVGProps, PropsWithChildren, createContext} from 'react';
import {ISize, Transform, Vector} from 'khusamov-base-types';
import useResizeCanvas from './useResizeCanvas';
import {CanvasStyle, WrapStyle} from './Canvas.module.scss'

export const CanvasSizeContext = createContext<ISize>({width: 0, height: 0})

// const data = 'M 10 10 L 100 100'
// <path d={data} transform='rotate(0)'/>

const svgProps: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: CanvasStyle
}

export type TOnResizeHandler = (size: ISize) => void

export interface ICanvasProps {
	onResize?: TOnResizeHandler
	offset?: Vector
	scale?: Vector
}

/**
 * Пока просто выводим кружочек, обозначающий местоположение корабля.
 */
export default function Canvas({children, onResize, offset = new Vector, scale = new Vector(1, 1)}: PropsWithChildren<ICanvasProps>) {
	const [ref, size] = useResizeCanvas(onResize)

	const transform = (
		new Transform()
			// Начало координат ставим в центр экрана.
			.translate(new Vector(size.width / 2, size.height / 2))
			// Масштабирование камеры.
			.scale(scale)
			// Смещение камеры.
			.translate(offset)
	)

	return (
		<div ref={ref} className={WrapStyle}>
			<CanvasSizeContext.Provider value={size}>
				<svg {...svgProps}>
					<g transform={transform.toString()}>
						{children}
					</g>
				</svg>
			</CanvasSizeContext.Provider>
		</div>
	)
}