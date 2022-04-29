import {Fragment} from 'react';
import {IMovable} from 'khusamov-game-command-system';
import GameObjectRender from './GameObjectRender';
import {Angle, ISize} from 'khusamov-base-types';

const radius = 10

interface ITheSpaceshipProps {
	theSpaceship: IMovable
	canvasSize: ISize
}

export default function TheSpaceship({theSpaceship, canvasSize: {width, height}}: ITheSpaceshipProps) {
	return (
		<Fragment>
			<GameObjectRender position={theSpaceship.position} size={{width, height}}>
				{({position}) => (
					<line
						x1={0} y1={0}
						x2={theSpaceship.appliedForce.length} y2={0}
						transform={`translate(${position.x} ${position.y}), rotate(${Angle.toDegree(theSpaceship.appliedForce.angle)})`}
					/>
				)}
			</GameObjectRender>
			<GameObjectRender position={theSpaceship.position} size={{width, height}}>
				{({position}) => <circle cx={position.x} cy={position.y} r={radius}/>}
			</GameObjectRender>
		</Fragment>
	)
}