import {IUniversalObject} from 'khusamov-universal-object';

export default interface IAdapterClass {
	new(universalObject: IUniversalObject): void
}