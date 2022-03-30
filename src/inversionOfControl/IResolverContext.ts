import {ReflectedTypeRef} from 'typescript-rtti';
import IoC from './IoC';

export default interface IResolverContext {
	iocContainer: IoC

	/**
	 * Временно сделан не обязательным. Ждем решения:
	 * https://github.com/typescript-rtti/typescript-rtti/issues/48
	 */
	reflectedTypeRef?: ReflectedTypeRef
}