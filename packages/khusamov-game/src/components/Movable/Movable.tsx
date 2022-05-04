import {IMovable} from 'khusamov-mechanical-motion';

const radius = 10

interface IMovableProps {
	movable: IMovable
}

export default function Movable({movable}: IMovableProps) {
	const {position} = movable
	const {x, y} = position
	return (
		<g transform={`translate(${x}, ${y})`}>
			<circle r={radius}/>
		</g>
	)
}