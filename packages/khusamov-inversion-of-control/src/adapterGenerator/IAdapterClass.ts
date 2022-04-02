import IUniversalObject from '../types/IUniversalObject';
import {IoC} from '../inversionOfControl';

export default interface IAdapterClass {
	new(universalObject: IUniversalObject, iocContainer: IoC): void
}