import {IUniversalObject} from 'khusamov-base-types';

export default interface IAdapterClass {
	new(universalObject: IUniversalObject): void
}