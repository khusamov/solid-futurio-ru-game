import {ICommand} from 'khusamov-base-types';
import {IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';
import IMovable from './IMovable';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import TransformForceCommand from './TransformForceCommand';
import ITransformForceOrder from './ITransformForceOrder';

// TODO Удалить! Вместо него использовать MoveTransformCommand

export default function transformForceResolver(orderObject: IUniversalObject): ICommand {
	const transformForceOrder = resolve<ITransformForceOrder>('Adapter', orderObject, reflect<ITransformForceOrder>())
	const {targetObjectSearchData, translate, rotate, scale, length, commandName} = transformForceOrder
	const targetObject = resolve<IUniversalObject>(targetObjectSearchData.type, targetObjectSearchData)

	return new StartCommand(
		commandName,
		targetObject,
		new RepeatableCommand(
			new TransformForceCommand(
				resolve<IMovable>('Adapter', targetObject, reflect<IMovable>()),
				translate,
				rotate,
				scale,
				length
			)
		)
	)
}