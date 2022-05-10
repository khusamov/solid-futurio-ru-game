import {Fragment} from 'react';
import {IMovable} from 'khusamov-game-command-system';
import GameObjectRender from './GameObjectRender';
import {Angle, ISize} from 'khusamov-base-types';
import styles from './TheSpaceship.module.scss'

const radius = 10

interface ITheSpaceshipProps {
	theSpaceship: IMovable
	canvasSize: ISize
}

export default function TheSpaceship({theSpaceship, canvasSize: {width, height}}: ITheSpaceshipProps) {
	return (
		<Fragment>
			<GameObjectRender position={theSpaceship.position} size={{width, height}}>
				{({position}) => <circle className={styles.theSpaceship} cx={position.x} cy={position.y} r={radius}/>}
			</GameObjectRender>
			<GameObjectRender position={theSpaceship.position} size={{width, height}}>
				{({position}) => (
					<line
						className={styles.appliedForce}
						x1={0} y1={0}
						x2={theSpaceship.appliedForce.length / 50} y2={0}
						transform={`translate(${position.x} ${position.y}), rotate(${Angle.toDegree(theSpaceship.appliedForce.angle)})`}
					/>
				)}
			</GameObjectRender>
			<GameObjectRender position={theSpaceship.position} size={{width, height}}>
				{({position}) => (
					<line
						className={styles.linearVelocity}
						x1={0} y1={0}
						x2={theSpaceship.linearVelocity.length} y2={0}
						transform={`translate(${position.x} ${position.y}), rotate(${Angle.toDegree(theSpaceship.linearVelocity.angle)})`}
					/>
				)}
			</GameObjectRender>
		</Fragment>
	)
}