import {ICommand, IQueue, IUniversalObject} from 'khusamov-base-types';

export type TOrderQueue = IQueue<IUniversalObject>
export type TCommandQueue = IQueue<ICommand>
export type TGameObjectList = IUniversalObject[]