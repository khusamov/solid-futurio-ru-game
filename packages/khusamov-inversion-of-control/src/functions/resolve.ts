import {TDependencyName, TResolver} from '../types';
import {Container} from '../classes';

export function resolve<T = unknown, R extends TResolver = TResolver>(dependencyName: TDependencyName, ...params: Parameters<R>): T {
	return Container.resolve<T, R>(dependencyName, ...params)
}