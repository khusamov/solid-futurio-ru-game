import {SVGProps, PropsWithChildren, createContext} from 'react';
import {ISize, Transform, Vector} from 'khusamov-base-types';
import useResizeCanvas from './useResizeCanvas';
import styles from './Canvas.module.scss'

export const CanvasSizeContext = createContext<ISize>({width: 0, height: 0})

// const data = 'M 10 10 L 100 100'
// <path d={data} transform='rotate(0)'/>

const svgProps: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: styles.Canvas
}

export type TOnResizeHandler = (size: ISize) => void

export interface ICanvasProps {
	onResize?: TOnResizeHandler
}

/**
 * Пока просто выводим кружочек, обозначающий местоположение корабля.
 */
export default function Canvas({children, onResize}: PropsWithChildren<ICanvasProps>) {
	const [ref, size] = useResizeCanvas(onResize)

	// Координаты камеры всегда отсчитываются от ее центра, поэтому сдвигаем все объекты на середину холста.
	const transform = new Transform().translate(new Vector(size.width / 2, size.height / 2))

	return (
		<div ref={ref} className={styles.Wrap}>
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