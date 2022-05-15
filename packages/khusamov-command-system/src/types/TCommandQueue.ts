import {IQueue} from 'khusamov-base-types';
import {ICommand} from '../interfaces';

/**
 * Очередь команд.
 */
export type TCommandQueue = IQueue<ICommand>