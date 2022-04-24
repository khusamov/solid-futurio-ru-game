import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';
import IMovable from './IMovable';
import {StartCommand} from 'khusamov-command-system';
import TransformForceCommand from './TransformForceCommand';
import ITransformForceAgentMessage from './ITransformForceAgentMessage';

export default function transformForceResolver(agentMessageObject: IUniversalObject): ICommand {
	const {targetObject: targetObjectData, translate, rotate, scale, length, commandName} = (
		resolve<ITransformForceAgentMessage>(
			'Adapter',
			agentMessageObject,
			reflect<ITransformForceAgentMessage>()
		)
	)

	const targetObject = getTargetObject(targetObjectData)

	const movable = resolve<IMovable>('Adapter', targetObject, reflect<IMovable>())
	const transformForceCommand = new TransformForceCommand(movable, translate, rotate, scale, length)

	return new StartCommand(transformForceCommand, commandName, targetObject)
}

function getTargetObject({type, name}: {type: string, name?: string}): IUniversalObject {
	if (!name) throw new Error(`Ожидается имя запрашиваемого объекта`)
	const targetObject = resolve<IUniversalObject | undefined>(type, name)
	if (!targetObject) throw new Error(`Для TransformForce не найден объект '${name}' типа '${type}'`)
	return targetObject
}