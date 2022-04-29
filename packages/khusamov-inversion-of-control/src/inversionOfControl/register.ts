import {IRegistrator} from 'khusamov-base-types';
import {TResolverFunction} from './types';
import resolve from './resolve';

export default function register(dependencyName: string, resolver: TResolverFunction) {
	return resolve<IRegistrator>('Registrator', dependencyName, resolver).register()
}