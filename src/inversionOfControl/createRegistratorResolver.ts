import IRegistrator from '../types/IRegistrator';
import DependencyRegistrator from './DependencyRegistrator';
import {TDependencyMap, TResolverFunction} from './IoC';

export default (
	function createRegistratorResolver(dependencyMap: TDependencyMap) {
		return (
			(dependencyName: string, resolver: TResolverFunction): IRegistrator => {
				return new DependencyRegistrator(dependencyMap, dependencyName, resolver)
			}
		)
	}
)