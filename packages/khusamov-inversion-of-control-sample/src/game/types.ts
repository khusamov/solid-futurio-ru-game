import {ICommand, IQueue} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';

export type TOrderQueue = IQueue<IUniversalObject>
export type TCommandQueue = IQueue<ICommand>
export type TGameObjectList = IUniversalObject[]