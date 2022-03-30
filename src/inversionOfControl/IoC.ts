import IRegistrator from '../types/IRegistrator';

export type TResolverFunction = (...args: Array<any>) => any

/**
 * Inversion Of Control Container.
 */
export default class IoC {
	private static readonly registratorDependencyName = 'Registrator'
	private dependencyMap: Map<string, TResolverFunction> = new Map()

	public constructor() {
		const registratorResolver = (
			(dependencyName: string, resolver: TResolverFunction): IRegistrator => {
				return new Registrator(this.dependencyMap, dependencyName, resolver)
			}
		)
		this.dependencyMap.set(IoC.registratorDependencyName, registratorResolver)
	}

	public resolve<T>(dependencyName: string, ...args: Array<any>): T {
		// TODO Сделать проверку соответствия типов аргументов args и resolver,
		//  а также соответствие выходного типа и запрашиваемого типа.
		const resolver = this.dependencyMap.get(dependencyName)
		if (!resolver) {
			throw new Error(`Не найдена зависимость '${dependencyName}'`)
		}
		return resolver(...args)
	}
}

class Registrator implements IRegistrator {
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