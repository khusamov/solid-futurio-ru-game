import UniversalObject from '../object/UniversalObject';
import IoC from '../inversionOfControl/IoC';

export default interface IAdapterClass {
	new(universalObject: UniversalObject, iocContainer: IoC): void
}