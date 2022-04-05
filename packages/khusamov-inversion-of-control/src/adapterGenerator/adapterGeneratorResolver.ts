import {ReflectedTypeRef} from 'typescript-rtti';
import adapterSourceGenerator from './adapterSourceGenerator';
import UniversalObject from '../object/UniversalObject';
import execFunctionScript from '../functions/execFunctionScript';
import IResolverContext from '../inversionOfControl/IResolverContext';
import IAdapterClass from './IAdapterClass';

export default (
	/**
	 * Разрешение зависимости генератора адаптера.
	 * @param universalObject Универсальный объект, для которого генерируется адаптер.
	 * @param reflectedTypeRef Отражение интерфейса для адаптера.
	 * @param context Контекст от IoC-контейнера. Добавляется автоматически.
	 * @return adapter Возвращается адаптер, реализующий интерфейс из reflectedTypeRef.
	 */
	function adapterGeneratorResolver(universalObject: UniversalObject, reflectedTypeRef: ReflectedTypeRef, context: IResolverContext) {
		const source = adapterSourceGenerator(reflectedTypeRef)
		const AdapterClass = execFunctionScript<IAdapterClass>(source)
		return new AdapterClass(universalObject)
	}
)