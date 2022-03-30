import createRegistratorResolver from './createRegistratorResolver';

export type TDependencyMap = Map<string, TResolverFunction>
export type TResolverFunction = (...args: Array<any>) => any

/**
 * Inversion Of Control Container.
 */
export default class IoC {
	private static readonly registratorDependencyName = 'Registrator'
	private dependencyMap: TDependencyMap = new Map()

	public constructor() {
		this.dependencyMap.set(
			IoC.registratorDependencyName,
			createRegistratorResolver(this.dependencyMap)
		)
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

