import {ICommandOrder} from 'khusamov-command-order-system';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

/**
 * Демонстрационный приказ.
 * Приказ на уничтожение игрового объекта.
 */
export default interface IDestroyOrder<R extends TResolverFunction> extends ICommandOrder {
	readonly type: 'Destroy'
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