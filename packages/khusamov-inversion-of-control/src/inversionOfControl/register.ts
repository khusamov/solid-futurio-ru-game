import {IRegistrator} from 'khusamov-base-types';
import {TResolverFunction} from './types';
import IoC from './IoC';

export default function register(dependencyName: string, resolver: TResolverFunction) {
	return IoC.resolve<IRegistrator>('Registrator', dependencyName, resolver).register()
}