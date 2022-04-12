import {ReflectedTypeRef} from 'typescript-rtti';
import IoC from './IoC';

export default interface IResolverContext {
	resolve<T>(dependencyName: string, ...args: Array<any>): T
	iocContainer: IoC

	/**
	 * Временно сделан не обязательным. Ждем решения:
	 * https://github.com/typescript-rtti/typescript-rtti/issues/48
	 * TODO Посмотреть typescript-rtti/issues/48 (автор сообщил что уже исправил).
	 */
	reflectedTypeRef?: ReflectedTypeRef
}