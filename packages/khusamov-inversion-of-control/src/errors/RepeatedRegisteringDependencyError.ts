import {TDependencyName} from '../types';
import {InversionOfControlError} from './InversionOfControlError';

export class RepeatedRegisteringDependencyError extends InversionOfControlError {
	public constructor(dependencyName: TDependencyName) {
		super(`Зависимость '${dependencyName}' уже зарегистрирована`);
	}
}