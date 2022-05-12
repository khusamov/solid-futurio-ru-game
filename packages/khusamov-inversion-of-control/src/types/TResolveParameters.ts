import {TResolver} from './TResolver';
import {TDependencyName} from './TDependencyMap';

/**
 * Параметры функции resolve() в виде кортежа.
 */
export type TResolveParameters<R extends TResolver = TResolver> = [TDependencyName, ...Parameters<R>]