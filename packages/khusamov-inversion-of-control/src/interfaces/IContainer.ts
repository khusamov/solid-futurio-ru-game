import {TDependency, TResolver, TDependencyName} from '../types';

export interface IContainer {
	resolve<T = unknown, R extends TResolver = TResolver>(dependencyName: TDependencyName, ...params: Parameters<R>): T
	register<R extends TResolver = TResolver>(dependencyName: TDependencyName, resolver: R): void
	readonly dependencies: Readonly<TDependency[]>
}