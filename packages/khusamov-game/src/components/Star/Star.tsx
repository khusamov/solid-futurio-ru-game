import {IUniversalObject} from 'khusamov-universal-object';
import {TransformableAdapter} from 'khusamov-mechanical-motion';
import styles from './Star.module.scss';
import {Transform} from 'khusamov-base-types';

interface IStarProps {
	object: IUniversalObject
}

const radius = 1

export default function Star({object}: IStarProps) {
	const transformable = new TransformableAdapter(object)
	const transform = (
		new Transform()
			.translate(transformable.position)
			.scale(transformable.scale)
	)
	return (
		<circle
			className={styles.Star}
			transform={transform.toString()}
			r={radius}
			cx={0}
			cy={0}
		/>
	)
}