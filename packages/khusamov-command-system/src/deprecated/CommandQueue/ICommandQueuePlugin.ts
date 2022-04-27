import {ICommand, IEventEmitter, IQueue} from 'khusamov-base-types';

export default interface ICommandQueuePlugin {
	init?(commandQueue: IQueue<ICommand>): void
	processingBeforeEnqueue?(command: ICommand): ICommand
}

export type TProcessingBeforeEnqueuePlugin = Required<Pick<ICommandQueuePlugin, 'processingBeforeEnqueue'>>

export function isProcessingBeforeEnqueuePlugin(plugin: ICommandQueuePlugin): plugin is TProcessingBeforeEnqueuePlugin {
	return 'processingBeforeEnqueue' in plugin
}