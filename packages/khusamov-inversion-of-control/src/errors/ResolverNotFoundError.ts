import {TDependencyName} from '../types';
import {InversionOfControlError} from './InversionOfControlError';

export class ResolverNotFoundError extends InversionOfControlError {
	public constructor(dependencyName: TDependencyName) {
		super(`Не найдена функция разрешения зависимости '${dependencyName}'`);
	}
}