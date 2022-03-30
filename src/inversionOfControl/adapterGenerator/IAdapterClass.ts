import UniversalObject from '../../object/UniversalObject';
import IoC from '../IoC';

export default interface IAdapterClass {
	new(universalObject: UniversalObject, iocContainer: IoC): void
}