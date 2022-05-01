import {IMovable} from 'khusamov-mechanical-motion';

const radius = 10

interface IMovableProps {
	movable: IMovable
}

export default function Movable({movable}: IMovableProps) {
	const {position} = movable
	const {x, y} = position
	return (
		<g x={x} y={y}>
			<circle cx={0} cy={0} r={radius}/>
		</g>
	)
}