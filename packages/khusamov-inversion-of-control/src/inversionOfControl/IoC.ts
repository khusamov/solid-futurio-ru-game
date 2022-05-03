import {Lazy} from 'khusamov-base-types';
import InversionOfControlError from './InversionOfControlError';
import createRegistratorResolver from './registrator/createRegistratorResolver';
import IResolverContext from './IResolverContext';
import {TDependencyMap} from './types';

/**
 * Контейнер инверсии управления (Inversion оf Control Container).
 * @link https://bit.ly/35sJch2
 */
export default class IoC {
	private static readonly registratorDependencyName = 'Registrator'
	private static readonly instanceHolder: Lazy<IoC> = new Lazy(() => new IoC)
	private readonly dependencyMap: TDependencyMap = new Map()

	public static get instance(): IoC {
		return this.instanceHolder.value
	}

	/**
	 * Статическая функция разрешения зависимости.
	 */
	public static resolve<T, P extends any[] = any[]>(dependencyName: string, ...params: P): T {
		return this.instance.resolve<T, P>(dependencyName, ...params)
	}

	public get dependencyNames(): string[] {
		const result: string[] = []
		for (const key of this.dependencyMap.keys()) {
			result.push(key)
		}
		return result
	}

	/**
	 * Конструктор контейнера IoC.
	 * Автоматически добавляется зависимость Registrator.
	 */
	private constructor() {
		this.dependencyMap.set(
			IoC.registratorDependencyName,
			createRegistratorResolver(this.dependencyMap)
		)
	}

	/**
	 * Разрешение зависимости.
	 * TODO Сделать проверку соответствия типов аргументов args из resolve() и resolver(),
	 * TODO Сделать проверку соответствия выходного типа resolver() и запрашиваемого типа resolve<T>.
	 */
	public resolve<T, P extends any[] = any[]>(dependencyName: string, ...params: P): T {
		const resolver = this.dependencyMap.get(dependencyName)
		if (!resolver) {
			throw new Error(`Не найдена зависимость '${dependencyName}'`)
		}
		return resolver(...params, this.getResolverContext())
	}

	private getResolverContext(): IResolverContext {
		return {
			resolve: this.resolve.bind(this),
			iocContainer: this
		}
	}
}