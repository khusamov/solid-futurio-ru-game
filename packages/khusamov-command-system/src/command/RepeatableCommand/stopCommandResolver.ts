import {reflect} from 'typescript-rtti';
import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IStopAgentMessage from './IStopAgentMessage';
import StopCommand from './StopCommand';

export default function stopCommandResolver(agentMessageObject: IUniversalObject): ICommand {
	const {commandName, targetObject: targetObjectData} = (
		resolve<IStopAgentMessage>(
			'Adapter',
			agentMessageObject,
			reflect<IStopAgentMessage>())
	)

	const targetObject = getTargetObject(targetObjectData)

	return new StopCommand(commandName, targetObject)
}


function getTargetObject({type, name}: {type: string, name?: string}): IUniversalObject {
	if (!name) throw new Error(`Ожидается имя запрашиваемого объекта`)
	const targetObject = resolve<IUniversalObject | undefined>(type, name)
	if (!targetObject) throw new Error(`Для TransformForce не найден объект '${name}' типа '${type}'`)
	return targetObject
}