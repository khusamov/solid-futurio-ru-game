import {ISize} from 'khusamov-base-types';
import ToroidalSurfaceAdapter from '../../game/gameObject/ToroidalSurfaceAdapter';
import {resolve} from 'khusamov-inversion-of-control';
import {IUniversalObject} from 'khusamov-universal-object';
import {TTargetObjectSearchParams} from '../../game/order/IStartMoveTransformOrder';

/**
 * При изменении размеров холста игры (игрового поля) необходимо поменять размеры игрового мира.
 * Используется для реализации пространства типа бублик.
 * @param size
 */
export default function reziseGameWorld(size: ISize) {
	const theGameWorld = (
		new ToroidalSurfaceAdapter(
			resolve<IUniversalObject, [TTargetObjectSearchParams]>(
				'GameObject',
				{
					type: 'GameObject',
					name: 'theGameWorld'
				}
			)
		)
	)
	theGameWorld.size = Object.assign({}, size)
}