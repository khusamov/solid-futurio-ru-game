import {SVGProps} from 'react';
import styles from './Canvas.module.scss'

const data = 'M 10 10 L 100 100'

const props: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: styles.Canvas,
	width: 500,
	height: 500
}

export default function Canvas() {
	return (
		<svg {...props}>
			<path d={data} transform='rotate(0)'/>
		</svg>
	)
}