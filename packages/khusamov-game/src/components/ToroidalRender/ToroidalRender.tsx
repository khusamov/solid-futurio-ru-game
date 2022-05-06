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
export default function ToroidalRender({position, toroidalSurfaceSize, children}: PropsWithChildren<IToroidalRenderProps>) {
	const {width, height} = toroidalSurfaceSize
	const {x, y} = position
	const offsets = (
		[
			[[+width, 0], [+width, +height], [0, +height]], // left-bottom
			[[-width, 0], [-width, +height], [0, +height]], // right-bottom
			[[+width, 0], [+width, -height], [0, -height]], // left-top
			[[-width, 0], [-width, -height], [0, -height]], // right-top
		][
			[
				x < width / 2 && y < height / 2, // left-bottom
				x > width / 2 && y < height / 2, // right-bottom
				x < width / 2 && y > height / 2, // left-top
				x > width / 2 && y > height / 2, // right-top
			].findIndex(item => item === true)
		]
	)
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