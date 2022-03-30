import {ReflectedTypeRef} from 'typescript-rtti';
import adapterSourceGenerator from './adapterSourceGenerator';
import UniversalObject from '../../object/UniversalObject';
import execFunctionScript from '../../functions/execFunctionScript';
import IAdapterClass from './IAdapterClass';
import IoC from '../IoC';

export default (
	function adapterGenerator(reflectedTypeRef: ReflectedTypeRef, universalObject: UniversalObject, iocContainer: IoC) {
		const source = adapterSourceGenerator(reflectedTypeRef)
		const AdapterClass = execFunctionScript<IAdapterClass>(source)
		return new AdapterClass(universalObject, iocContainer)
	}
)