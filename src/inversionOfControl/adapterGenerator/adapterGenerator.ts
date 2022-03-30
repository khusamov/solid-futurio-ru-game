import {ReflectedTypeRef} from 'typescript-rtti';
import adapterSourceGenerator from './adapterSourceGenerator';
import UniversalObject from '../../object/UniversalObject';
import execFunctionScript from '../../functions/execFunctionScript';
import IResolverContext from '../IResolverContext';
import IAdapterClass from './IAdapterClass';

export default (
	function adapterGenerator(universalObject: UniversalObject, reflectedTypeRef: ReflectedTypeRef, context: IResolverContext) {
		const source = adapterSourceGenerator(reflectedTypeRef)
		const AdapterClass = execFunctionScript<IAdapterClass>(source)
		return new AdapterClass(universalObject, context.iocContainer)
	}
)