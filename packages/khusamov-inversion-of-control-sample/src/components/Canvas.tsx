import styles from './Canvas.module.scss'
import {SVGProps} from 'react';

const data = 'M 10 10 L 100 100'

const props: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	width: 500,
	height: 500,
	className: styles.Canvas
}

export default function Canvas() {
	return (
		<svg {...props}>
			<path d={data} transform='rotate(0)'/>
		</svg>
	)
}