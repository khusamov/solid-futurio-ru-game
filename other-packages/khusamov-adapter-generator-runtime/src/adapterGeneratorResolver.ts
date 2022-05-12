import {ReflectedTypeRef} from 'typescript-rtti';
import {execFunctionScript} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import adapterSourceGenerator from './adapterSourceGenerator';
import IAdapterClass from './IAdapterClass';

export default (
	/**
	 * Разрешение зависимости генератора адаптера.
	 * @param universalObject Универсальный объект, для которого генерируется адаптер.
	 * @param reflectedTypeRef Отражение интерфейса для адаптера.
	 * @return adapter Возвращается адаптер, реализующий интерфейс из reflectedTypeRef.
	 */
	function adapterGeneratorResolver(universalObject: IUniversalObject, reflectedTypeRef: ReflectedTypeRef) {
		const source = adapterSourceGenerator(reflectedTypeRef)
		const AdapterClass = execFunctionScript<IAdapterClass>(source)
		return new AdapterClass(universalObject)
	}
)