import {SVGProps} from 'react';
import {Vector} from 'khusamov-base-types';
import styles from './Canvas.module.scss'

// const data = 'M 10 10 L 100 100'
// <path d={data} transform='rotate(0)'/>

const props: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: styles.Canvas,
	width: 500,
	height: 500
}

export interface ICanvasProps {
	theSpaceshipPosition: Vector
}

/**
 * Пока просто выводим кружочек, обозначающий местоположение корабля.
 * @param x
 * @param y
 * @constructor
 */
export default function Canvas({theSpaceshipPosition: {x, y}}: ICanvasProps) {
	return (
		<svg {...props}>
			<circle cx={x} cy={y} r={5}/>
		</svg>
	)
}