import {IRegistrator} from 'khusamov-base-types';
import {TResolverFunction} from './types';
import resolve from './resolve';

export default function register<R = TResolverFunction>(dependencyName: string, resolver: R) {
	return resolve<IRegistrator>('Registrator', dependencyName, resolver).register()
}