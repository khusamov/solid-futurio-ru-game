import {TDependencyName} from '../types';
import {InversionOfControlError} from './InversionOfControlError';

export class DependencyNotFoundError extends InversionOfControlError {
	public constructor(dependencyName: TDependencyName) {
		super(`Не найдена зависимость '${dependencyName}'`);
	}
}