import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';
import IMovable from './IMovable';
import {RepeatableCommand, StartCommand} from 'khusamov-command-system';
import TransformForceCommand from './TransformForceCommand';
import ITransformForceOrder from './ITransformForceOrder';

export default function transformForceResolver(agentMessageObject: IUniversalObject): ICommand {
	const transformForceOrder = (
		resolve<ITransformForceOrder>(
			'Adapter',
			agentMessageObject,
			reflect<ITransformForceOrder>()
		)
	)

	const {targetObject: targetObjectData, translate, rotate, scale, length, commandName} = transformForceOrder

	const targetObject = getTargetObject(targetObjectData)

	return new StartCommand(
		commandName,
		targetObject,
		new RepeatableCommand(
			new TransformForceCommand(
				resolve<IMovable>('Adapter', targetObject, reflect<IMovable>()),
				translate,
				rotate,
				scale,
				length)
		)
	)
}

function getTargetObject({type, name}: {type: string, name?: string}): IUniversalObject {
	if (!name) throw new Error(`Ожидается имя запрашиваемого объекта`)
	const targetObject = resolve<IUniversalObject | undefined>(type, name)
	if (!targetObject) throw new Error(`Для TransformForce не найден объект '${name}' типа '${type}'`)
	return targetObject
}