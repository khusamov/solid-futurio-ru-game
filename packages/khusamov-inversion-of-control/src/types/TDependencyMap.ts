import {TResolver} from './TResolver';

export type TDependencyName = string

/**
 * Карта соответствия зависимостей и разрешающих их функций.
 */
export type TDependencyMap = Map<TDependencyName, TResolver>