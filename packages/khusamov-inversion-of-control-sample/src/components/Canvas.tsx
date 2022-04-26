import {LegacyRef, SVGProps, Fragment} from 'react';
import {Angle, ISize, Vector} from 'khusamov-base-types';
import styles from './Canvas.module.scss'
import useResizeObserver from 'use-resize-observer';

// const data = 'M 10 10 L 100 100'
// <path d={data} transform='rotate(0)'/>

const props: SVGProps<SVGSVGElement> = {
	version: '1.1',
	xmlns: 'http://www.w3.org/2000/svg',
	className: styles.Canvas
}

export interface ICanvasProps {
	theSpaceshipPosition: Vector
	theSpaceshipAppliedForce: Vector
	refWrap?: LegacyRef<HTMLDivElement>
}

interface ICircleClonesProps {
	position: Vector
	size: ISize
	radius: number
}

/**
 * Добавлены вывод окружностей для плавного пересечения границ замкнутого пространства.
 * TODO Сделать расчет не 8 клонов, а трех с учетом квадранта, в котором находится корабль.
 * TODO Перенести клоны в расчетную часть, так как надо будет делать расчеты столкновений.
 */
function CircleClones({position: {x, y}, size: {width, height}, radius}: ICircleClonesProps) {
	return (
		<Fragment>
			<circle cx={x - width} cy={y} r={radius}/>
			<circle cx={x + width} cy={y} r={radius}/>
			<circle cx={x} cy={y + height} r={radius}/>
			<circle cx={x} cy={y - height} r={radius}/>
			<circle cx={x - width} cy={y - height} r={radius}/>
			<circle cx={x - width} cy={y + height} r={radius}/>
			<circle cx={x + width} cy={y - height} r={radius}/>
			<circle cx={x + width} cy={y + height} r={radius}/>
		</Fragment>
	)
}

/**
 * Пока просто выводим кружочек, обозначающий местоположение корабля.
 */
export default function Canvas({refWrap, theSpaceshipPosition: {x, y}, theSpaceshipAppliedForce}: ICanvasProps) {
	const {ref, width = 0, height = 0} = useResizeObserver()
	const radius = 10
	return (
		<div ref={refWrap} className={styles.Wrap}>
			<div ref={ref} className={styles.Wrap}>
				<svg {...props}>
					<line
						x1={0} y1={0}
						x2={theSpaceshipAppliedForce.length} y2={0}
						transform={`translate(${x} ${y}), rotate(${Angle.toDegree(theSpaceshipAppliedForce.angle)})`}
					/>
					<circle cx={x} cy={y} r={radius}/>
					<CircleClones radius={radius} size={{width, height}} position={new Vector(x, y)}/>
				</svg>
			</div>
		</div>
	)
}