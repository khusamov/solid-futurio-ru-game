import {Fragment, ReactElement} from 'react';
import {ISize, Vector} from 'khusamov-base-types';

interface IRenderProps {
	position: Vector
}

interface IClonesProps {
	position: Vector
	size: ISize
	children: (props: IRenderProps) => ReactElement
}

/**
 * Добавлены вывод окружностей для плавного пересечения границ замкнутого пространства.
 * TODO Сделать расчет не 8 клонов, а трех с учетом квадранта, в котором находится корабль.
 * TODO Перенести клоны в расчетную часть, так как надо будет делать расчеты столкновений.
 */
export default function GameObjectRender({position, size: {width, height}, children: Render}: IClonesProps) {
	const offsets = [
		[-width, 0], [width, 0], [0, height], [0, -height],
		[-width, -height], [-width, height], [width, -height], [width, height],
	]
	const positions = [
		position,
		...offsets.map(offset => position.translate(new Vector(offset[0], offset[1])))
	]
	return (
		<Fragment>
			{positions.map(position => <Render position={position}/>)}
		</Fragment>
	)
}