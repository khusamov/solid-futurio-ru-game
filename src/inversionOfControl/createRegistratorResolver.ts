import IRegistrator from '../types/IRegistrator';
import DependencyRegistrator from './DependencyRegistrator';
import {TResolverFunction} from './IoC';

export default function createRegistratorResolver(dependencyMap: Map<string, TResolverFunction>) {
	return (
		(dependencyName: string, resolver: TResolverFunction): IRegistrator => {
			return new DependencyRegistrator(dependencyMap, dependencyName, resolver)
		}
	)
}