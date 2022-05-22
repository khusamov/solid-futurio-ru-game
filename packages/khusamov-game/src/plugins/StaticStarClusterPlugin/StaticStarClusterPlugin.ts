import {GamePlugin} from '../../classes/GamePlugin';
import {resolve} from 'khusamov-inversion-of-control';
import {TGameObjectList} from '../../game/types';
import ToroidalSurfaceAdapter from '../../game/gameObject/ToroidalSurfaceAdapter';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {Vector} from 'khusamov-base-types';
import IGameObject from '../../game/gameObject/IGameObject';
import {ITransformable} from 'khusamov-mechanical-motion';
import IRenderable from '../../game/gameObject/IRenderable';

/**
 * Генерация статических звезд.
 */
export class StaticStarClusterPlugin extends GamePlugin {
	init(): void {
		const gameObjectList = resolve<TGameObjectList>('GameObjectList')

		function getRandomInt(min: number, max: number) {
			min = Math.ceil(min)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
		}

		const theGameWorld = new ToroidalSurfaceAdapter(resolve<IUniversalObject>('GameObject', 'theGameWorld'))

		Array(100)
			.fill(1)
			.map(() => {
				const scale = getRandomInt(1, 10)
				return {
					position: new Vector(
						getRandomInt(0, theGameWorld.size.width),
						getRandomInt(0, theGameWorld.size.height)
					),
					scale: new Vector(scale, scale)
				}
			})
			.forEach(({scale, position}, index) => {
				gameObjectList.push(
					createUniversalObject<Partial<IGameObject & ITransformable & IRenderable>>({
						name: 'theStar' + index,
						kind: ['IGameObject', 'ITransformable', 'IRenderable'],
						renderComponent: 'Star',
						position,
						scale
					})
				)
			})
	}
}