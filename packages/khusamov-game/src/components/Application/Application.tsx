import {FunctionComponent, useState} from 'react';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import {TGameObjectList} from '../../game/types';
import Spaceship from '../Spaceship';
import Canvas, {TOnResizeHandler} from '../Canvas';
import styles from './Application.module.scss'
import reziseGameWorld from './reziseGameWorld';
import ToroidalRender from '../ToroidalRender/ToroidalRender';
import {MovableAdapter} from 'khusamov-mechanical-motion';
import {ISize} from 'khusamov-base-types';

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship
}

export default function Application() {
	const [gameWorldSize, setGameWorldSize] = useState<ISize>({width: 0, height: 0})
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const onResize: TOnResizeHandler = size => {
		reziseGameWorld(size)
		setGameWorldSize(size)
	}
	return (
		<div className={styles.Application}>
			<Canvas onResize={onResize}>
				{gameObjectList.map(object => {
					const gameObject = new GameObjectAdapter(object)
					if (gameObject.kind.includes('IRenderable')) {
						const renderable = new RenderableAdapter(object)
						const movable = new MovableAdapter(object)
						const RenderComponent = renderableMap[renderable.renderComponent]
						return (
							<ToroidalRender position={movable.position} toroidalSurfaceSize={gameWorldSize}>
								<RenderComponent object={object}/>
							</ToroidalRender>
						)
					}
					return null
				})}
			</Canvas>
		</div>
	)
}