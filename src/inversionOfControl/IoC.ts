export type TResolverFunction = (...args: Array<any>) => any

/**
 * Inversion Of Control Container.
 */
export default class IoC {
	private static readonly registerDependencyName = 'Register'
	private static dependencyMap: Map<string, TResolverFunction> = new Map()

	public static register(dependencyName: string, resolver: TResolverFunction) {
		console.warn('Метод register() устарел, используйте методы init() и resolve("Register")')
		if (this.dependencyMap.has(dependencyName)) {
			throw new Error(`Зависимость '${dependencyName}' уже зарегистрирована`)
		}
		this.dependencyMap.set(dependencyName, resolver)
	}

	public static init() {
		const registerResolver = (dependencyName: string, resolver: TResolverFunction) => {
			if (this.dependencyMap.has(dependencyName)) {
				throw new Error(`Зависимость '${dependencyName}' уже зарегистрирована`)
			}
			this.dependencyMap.set(dependencyName, resolver)
		}
		this.dependencyMap.set(this.registerDependencyName, registerResolver)
	}

	public static resolve<T>(dependencyName: string, ...args: Array<any>): T {
		// TODO Сделать проверку соответствия типов аргументов args и resolver,
		//  а также соответствие выходного типа и запрашиваемого типа.
		const resolver = this.dependencyMap.get(dependencyName)
		if (!resolver) {
			throw new Error(`Не найдена зависимость '${dependencyName}'`)
		}
		return resolver(...args)
	}
}