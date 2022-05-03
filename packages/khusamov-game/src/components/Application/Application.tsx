import styles from './Application.module.scss'
import Canvas from '../Canvas';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../../game/types';
import Movable from '../Movable';
import {IMovable} from 'khusamov-mechanical-motion';

export default function Application() {
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	return (
		<div className={styles.Application}>
			<Canvas>
				{gameObjectList.map(gameObject => {
					if (gameObject.kind && gameObject.kind.includes('IMovable')) {
						return <Movable movable={gameObject as IMovable}/>
					}
					return null
				})}
			</Canvas>
		</div>
	)
}