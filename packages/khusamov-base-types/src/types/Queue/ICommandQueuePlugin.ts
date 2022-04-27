import IQueue from './IQueue';
import ICommand from '../ICommand';

export default interface ICommandQueuePlugin {
	init?(commandQueue: IQueue<ICommand>): void
	processingBeforeEnqueue?(command: ICommand): ICommand
}

export type TProcessingBeforeEnqueuePlugin = Required<Pick<ICommandQueuePlugin, 'processingBeforeEnqueue'>>

export function isProcessingBeforeEnqueuePlugin(plugin: ICommandQueuePlugin): plugin is TProcessingBeforeEnqueuePlugin {
	return 'processingBeforeEnqueue' in plugin
}