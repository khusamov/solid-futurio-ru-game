import {TDependencyName} from './TDependencyMap';
import {TResolver} from './TResolver';

export type TDependency = {
	name: TDependencyName
	resolver: TResolver
}