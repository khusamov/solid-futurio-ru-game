import {Lazy} from 'khusamov-base-types';
import createRegistratorResolver from './createRegistratorResolver';
import IResolverContext from './IResolverContext';
import {TDependencyMap} from './types';

/**
 * Контейнер инверсии управления (Inversion оf Control Container).
 * @link https://bit.ly/35sJch2
 */
export default class IoC {
	private static readonly registratorDependencyName = 'Registrator'
	private static instanceHolder: Lazy<IoC> = new Lazy(() => new IoC)
	private dependencyMap: TDependencyMap = new Map()

	public static get instance(): IoC {
		return this.instanceHolder.value
	}

	public get dependencyNames(): string[] {
		const result: string[] = []
		for (const key of this.dependencyMap.keys()) {
			result.push(key)
		}
		return result
	}

	/**
	 * Работа с контейнером по шаблону Синглтон.
	 */
	public static resolve<T>(dependencyName: string, ...args: Array<any>): T {
		return this.instanceHolder.value.resolve<T>(dependencyName, ...args)
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
	public resolve<T>(dependencyName: string, ...args: Array<any>): T {
		const resolver = this.dependencyMap.get(dependencyName)
		if (!resolver) {
			throw new Error(`Не найдена зависимость '${dependencyName}'`)
		}
		return resolver(...args, this.getContext())
	}

	private getContext(): IResolverContext {
		return {
			resolve: this.resolve.bind(this),
			iocContainer: this
		}
	}
}