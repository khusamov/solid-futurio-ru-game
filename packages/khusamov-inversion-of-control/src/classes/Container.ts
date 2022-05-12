import {Lazy} from 'khusamov-base-types';
import {IContainer} from '../interfaces';
import {DependencyNotFoundError, RepeatedRegisteringDependencyError, ResolverNotFoundError} from '../errors';
import {TDependency, TDependencyMap, TDependencyName, TResolver} from '../types';

/**
 * Контейнер инверсии управления (Inversion оf Control Container).
 * @link https://bit.ly/35sJch2
 */
export class Container implements IContainer {
	private static readonly instanceHolder: Lazy<Container> = new Lazy(() => new Container)
	private readonly dependencyMap: TDependencyMap = new Map()
	private constructor() {}

	/**
	 * Единый глобальный контейнер инверсии управления.
	 */
	public static get instance(): Container {
		return this.instanceHolder.value
	}

	/**
	 * Разрешение зависимости.
	 * @param dependencyName
	 * @param params
	 */
	public static resolve<T, R extends TResolver = TResolver>(dependencyName: TDependencyName, ...params: Parameters<R>): T {
		return this.instance.resolve<T, R>(dependencyName, ...params)
	}

	/**
	 * Регистрация зависимости.
	 * @param dependencyName
	 * @param resolver
	 */
	public static register<R extends TResolver = TResolver>(dependencyName: TDependencyName, resolver: R): void {
		return this.instance.register<R>(dependencyName, resolver)
	}

	/**
	 * Массив зависимостей.
	 */
	public get dependencies(): Readonly<TDependency[]> {
		const result: TDependency[] = []
		for (const name of this.dependencyMap.keys()) {
			const resolver = this.dependencyMap.get(name)
			if (!resolver) {
				throw new ResolverNotFoundError(name)
			}
			result.push({name, resolver})
		}
		return result
	}

	/**
	 * Разрешение зависимости.
	 * @param dependencyName
	 * @param params
	 */
	public resolve<T, R extends TResolver = TResolver>(dependencyName: TDependencyName, ...params: Parameters<R>): T {
		const resolver = this.dependencyMap.get(dependencyName)
		if (!resolver) {
			throw new DependencyNotFoundError(dependencyName)
		}

		return resolver(...params)
	}

	/**
	 * Регистрация зависимости.
	 * @param dependencyName
	 * @param resolver
	 */
	public register<R extends TResolver = TResolver>(dependencyName: TDependencyName, resolver: R): void {
		if (this.dependencyMap.has(dependencyName)) {
			throw new RepeatedRegisteringDependencyError(dependencyName)
		}
		this.dependencyMap.set(dependencyName, resolver)
	}
}