import {TDependencyName, TResolver} from '../types';
import {Container} from '../classes';

export function register<R extends TResolver = TResolver>(dependencyName: TDependencyName, resolver: R): void {
	Container.register(dependencyName, resolver)
}