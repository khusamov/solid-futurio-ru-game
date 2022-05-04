import {MovableAdapter} from 'khusamov-mechanical-motion';
import {IUniversalObject} from 'khusamov-universal-object';

const radius = 10

interface ISpaceshipProps {
	object: IUniversalObject
}

export default function Spaceship({object}: ISpaceshipProps) {
	const {position} = new MovableAdapter(object)
	const {x, y} = position
	return (
		<g transform={`translate(${x}, ${y})`}>
			<circle r={radius}/>
		</g>
	)
}