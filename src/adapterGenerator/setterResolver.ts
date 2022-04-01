import IUniversalObject from '../types/IUniversalObject';
import ICommand from '../types/ICommand';

export default (
	function setterResolver<T>(universalObject: IUniversalObject, propertyName: string, value: T): ICommand {
		return {
			execute() {
				universalObject.setValue(propertyName, value)
			}
		}
	}
)