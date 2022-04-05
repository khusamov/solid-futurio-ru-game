import {IRegistrator} from 'khusamov-base-types';
import {TResolverFunction} from './types';

export default class DependencyRegistrator implements IRegistrator {
	constructor(
		private dependencyMap: Map<string, TResolverFunction>,
		private dependencyName: string,
		private resolver: TResolverFunction
	) {}

	register(): void {
		if (this.dependencyMap.has(this.dependencyName)) {
			throw new Error(`Зависимость '${this.dependencyName}' уже зарегистрирована`)
		}
		this.dependencyMap.set(this.dependencyName, this.resolver)
	}
}