/**
 * Внимание, последний аргумент всегда содержит IResolverContext.
 */
export type TResolverFunction = (...params: any[]) => any

/**
 * Карта соответствия зависимостей и разрешающих их функций.
 */
export type TDependencyMap = Map<string, TResolverFunction>