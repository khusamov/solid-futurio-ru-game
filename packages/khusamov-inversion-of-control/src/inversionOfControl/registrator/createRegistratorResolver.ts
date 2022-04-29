import {IRegistrator} from 'khusamov-base-types';
import DependencyRegistrator from './DependencyRegistrator';
import {TDependencyMap, TResolverFunction} from '../types';

export default (
	function createRegistratorResolver(dependencyMap: TDependencyMap): TResolverFunction {
		return (
			(dependencyName: string, resolver: TResolverFunction): IRegistrator => (
				new DependencyRegistrator(dependencyMap, dependencyName, resolver)
			)
		)
	}
)