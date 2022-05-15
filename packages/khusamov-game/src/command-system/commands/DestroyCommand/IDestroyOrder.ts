import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

/**
 * Демонстрационный приказ.
 * Приказ на уничтожение игрового объекта.
 */
export interface IDestroyOrder<R extends TResolver = TResolver> extends ICommandOrder<'DestroyCommand'> {
	readonly targetObject: TResolveParameters<R>
}

// Демонстрация возможности уничтожения объектов.
// document.addEventListener('keydown', event => {
// 	if (event.code === 'KeyQ') {
// 		orderQueue.enqueue(
// 			createUniversalObject<IDestroyOrder>({
// 				type: 'Destroy',
// 				targetObject: {
// 					type: 'GameObject',
// 					name: 'theSpaceship'
// 				}
// 			})
// 		)
// 	}
// })