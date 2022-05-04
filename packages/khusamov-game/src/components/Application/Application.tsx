import {FunctionComponent} from 'react';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {MovableAdapter} from 'khusamov-mechanical-motion';
import useRequestAnimationFrame from '../../game/useRequestAnimationFrame';
import GameObjectAdapter from '../../game/gameObject/GameObjectAdapter';
import RenderableAdapter from '../../game/gameObject/RenderableAdapter';
import {TGameObjectList} from '../../game/types';
import ToroidalRender from '../ToroidalRender/ToroidalRender';
import {CanvasSizeContext} from '../Canvas';
import Spaceship from '../Spaceship';
import Canvas, {TOnResizeHandler} from '../Canvas';
import styles from './Application.module.scss'
import reziseGameWorld from './reziseGameWorld';

type TUniversalRenderComponent = FunctionComponent<{object: IUniversalObject}>
const renderableMap: Record<string, TUniversalRenderComponent> = {
	Spaceship
}

export default function Application() {
	useRequestAnimationFrame()
	const gameObjectList = resolve<TGameObjectList>('GameObjectList')
	const onResize: TOnResizeHandler = size => {
		reziseGameWorld(size)
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
							<CanvasSizeContext.Consumer>
								{canvasSize => (
									<ToroidalRender position={movable.position} toroidalSurfaceSize={canvasSize}>
										<RenderComponent object={object}/>
									</ToroidalRender>
								)}
							</CanvasSizeContext.Consumer>
						)
					}
					return null
				})}
			</Canvas>
		</div>
	)
}