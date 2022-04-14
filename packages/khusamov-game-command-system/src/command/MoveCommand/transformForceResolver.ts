import {ICommand, IUniversalObject} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import {reflect} from 'typescript-rtti';
import IMovable from './IMovable';
import {StartCommand} from 'khusamov-command-system';
import TransformForceCommand from './TransformForceCommand';
import ITransformForceAgentMessage from './ITransformForceAgentMessage';

export default function transformForceResolver(agentMessageObject: IUniversalObject): ICommand {
	const message = resolve<ITransformForceAgentMessage>('Adapter', agentMessageObject, reflect<ITransformForceAgentMessage>())
	const gameObject = resolve<IUniversalObject>(message.targetObject.type, message.targetObject.id)
	const movable = resolve<IMovable>('Adapter', gameObject, reflect<IMovable>())
	const transformForceCommand = new TransformForceCommand(movable, message.scale, message.angle)
	return new StartCommand(transformForceCommand, 'TransformForce', gameObject)
}