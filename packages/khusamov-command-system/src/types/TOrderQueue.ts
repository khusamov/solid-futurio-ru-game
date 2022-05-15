import {IQueue} from 'khusamov-base-types';
import {ICommandOrder} from '../interfaces';

/**
 * Очередь приказов это простая очередь IQueue,
 * где каждый элемент реализует интерфейс IUniversalObject.
 */
export type TOrderQueue = IQueue<ICommandOrder>