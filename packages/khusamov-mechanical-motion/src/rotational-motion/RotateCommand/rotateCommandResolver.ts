import {createAdapter, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {ICommand, NotFoundTargetObjectError} from 'khusamov-command-system';
import {RotableAdapter, TransformableAdapter} from '../../interfaces';
import {IRotateCommandOrder} from './IRotateCommandOrder';
import {RotateCommand} from './RotateCommand';

export function rotateCommandResolver(rotateCommandOrder: IRotateCommandOrder): ICommand {
	const targetObject = resolve<IUniversalObject | undefined>(...rotateCommandOrder.targetObject)

	if (!targetObject) {
		throw new NotFoundTargetObjectError(rotateCommandOrder.targetObject)
	}

	return new RotateCommand(createAdapter(targetObject, TransformableAdapter, RotableAdapter))
}