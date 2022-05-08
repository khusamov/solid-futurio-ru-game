import {PropsWithChildren} from 'react';
import {ISize, Vector} from 'khusamov-base-types';

export interface IToroidalRenderProps {
	position: Vector
	toroidalSurfaceSize: ISize
	isVisible?: (position: Vector) => boolean
}

/**
 * Отрисовывает копии игрового объекта для непрерывного пересечения замкнутого пространства типа бублик.
 * @param position Координаты игрового объекта.
 * @param toroidalSurfaceSize Размеры игрового пространства.
 * @param isVisible Функция для оптимизации вывода (возвращает флаг - показывать или нет тот или иной объект).
 * @param children Отрисовка игрового объекта в своих координатах.
 */
export default function ToroidalRender({toroidalSurfaceSize, children, isVisible = () => true, position}: PropsWithChildren<IToroidalRenderProps>) {
	const {width, height} = toroidalSurfaceSize

	let offsets = [
		[+width, +height],
		[-width, +height],
		[+width, -height],
		[-width, -height],
		[0, +height],
		[0, -height],
		[+width, 0],
		[-width, 0],
		[0, 0]
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



	offsets = offsets.filter(([x, y]) => isVisible(position.translate(new Vector(x, y))))

	if (offsets.length <= 0) return null

	return (
		<g>
			{offsets.map(([x, y]) => (
				<g transform={`translate(${x}, ${y})`}>
					{children}
				</g>
			))}
		</g>
	)
}