import {LegacyRef, SVGProps} from 'react';
import useResizeObserver from 'use-resize-observer';
import {IMovable} from 'khusamov-game-command-system';
import styles from './Canvas.module.scss'
import TheSpaceship from './TheSpaceship';

// const data = 'M 10 10 L 100 100'
// <path d={data} transform='rotate(0)'/>

const svgProps: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: styles.Canvas
}

export interface ICanvasProps {
	theSpaceship: IMovable
	refWrap?: LegacyRef<HTMLDivElement>
}

/**
 * Пока просто выводим кружочек, обозначающий местоположение корабля.
 */
export default function Canvas({refWrap, theSpaceship}: ICanvasProps) {
	const {ref, width = 0, height = 0} = useResizeObserver()

	return (
		<div ref={refWrap} className={styles.Wrap}>
			<div ref={ref} className={styles.Wrap}>
				<svg {...svgProps}>
					<TheSpaceship theSpaceship={theSpaceship} canvasSize={{width, height}}/>
				</svg>
			</div>
		</div>
	)
}