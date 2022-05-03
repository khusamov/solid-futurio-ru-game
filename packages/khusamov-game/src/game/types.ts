import {ICommand, IQueue} from 'khusamov-base-types';
import {IOrder} from 'khusamov-command-system';
import {IUniversalObject} from 'khusamov-universal-object';

export type TOrder = Record<string, any>

export type TOrderQueue = IQueue<IOrder>
export type TCommandQueue = IQueue<ICommand>

export type TGameObjectList = IUniversalObject[]