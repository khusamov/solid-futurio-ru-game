import IoC from './IoC';
import {TResolverFunction} from './types';

export default function resolve<T, P extends TResolverFunction = TResolverFunction>(dependencyName: string, ...params: Parameters<P>): T {
	return IoC.resolve<T, P>(dependencyName, ...params)
}