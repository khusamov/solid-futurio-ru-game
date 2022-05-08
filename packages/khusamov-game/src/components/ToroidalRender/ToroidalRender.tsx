import {PropsWithChildren} from 'react';
import {ISize, Vector} from 'khusamov-base-types';

export interface IToroidalRenderProps {
	position: Vector
	toroidalSurfaceSize: ISize
}

/**
 * Отрисовывает копии игрового объекта для непрерывного пересечения замкнутого пространства типа бублик.
 * @param position Координаты игрового объекта.
 * @param toroidalSurfaceSize Размеры игрового пространства.
 * @param children Отрисовка игрового объекта в своих координатах.
 */
export default function ToroidalRender({toroidalSurfaceSize, children}: PropsWithChildren<IToroidalRenderProps>) {
	const {width, height} = toroidalSurfaceSize

	const offsets = [
		[+width, +height],
		[-width, +height],
		[+width, -height],
		[-width, -height],
		[0, +height],
		[0, -height],
		[+width, 0],
		[-width, 0]
	]

	// Для смещенной камеры сложно подсчитать клоны и пока просто тупо выводятся все 8 клонов.
	// Эти рассчеты оставлены, так как при столкновениях все равно будут считаться только три клона, а не все 8.
	//
	// const {x, y} = position
	//
	// const middleX = width / 2 + toroidalSurfaceOffset.x
	// const middleY = height / 2 + toroidalSurfaceOffset.y
	//
	// const offsets = (
	// 	[
	// 		[[+width, 0], [+width, +height], [0, +height]], // left-bottom
	// 		[[-width, 0], [-width, +height], [0, +height]], // right-bottom
	// 		[[+width, 0], [+width, -height], [0, -height]], // left-top
	// 		[[-width, 0], [-width, -height], [0, -height]], // right-top
	// 		// [[+150, 0], [+150, +150], [0, +150]], // left-bottom
	// 		// [[-150, 0], [-150, +150], [0, +150]], // right-bottom
	// 		// [[+150, 0], [+150, -150], [0, -150]], // left-top
	// 		// [[-150, 0], [-150, -150], [0, -150]], // right-top
	// 	][
	// 		[
	// 			x < middleX && y < middleY, // left-bottom
	// 			x > middleX && y < middleY, // right-bottom
	// 			x < middleX && y > middleY, // left-top
	// 			x > middleX && y > middleY, // right-top
	// 		].findIndex(item => item === true)
	// 	]
	// )

	return (
		<g>
			{children}
			{offsets && offsets.map(([x, y]) => (
				<g transform={`translate(${x}, ${y})`}>
					{children}
				</g>
			))}
		</g>
	)
}