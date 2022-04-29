import useResizeObserver from 'use-resize-observer';
import {resolve} from 'khusamov-inversion-of-control';
import {IMovable, IMovableReflectedTypeRef} from 'khusamov-game-command-system';
import {findGameObjectByName} from '../../game/findGameObject';
import useGame from '../../game/useGame';
import Game from '../../game/Game';
import Canvas from '../Canvas';
import styles from './Application.module.scss'
import Params from '../Params';

const game = new Game({timeout: 1})
const theSpaceshipObject = findGameObjectByName(game.gameObjectList, 'theSpaceship')

export default function Application() {
	useGame({renderTimeout: 1, game})

	const theSpaceship = (
		theSpaceshipObject
			? resolve<IMovable>('Adapter', theSpaceshipObject, IMovableReflectedTypeRef)
			: undefined
	)

	if (!theSpaceship) return null

	const {ref} = useResizeObserver({
		onResize({width, height}) {
			if (width !== undefined && height !== undefined) {
				game.size = {width, height}
			}
		}
	})

	return (
		<div className={styles.Application}>
			<Params game={game} theSpaceship={theSpaceship}/>
			<Canvas refWrap={ref} theSpaceship={theSpaceship}/>
		</div>
	)
}