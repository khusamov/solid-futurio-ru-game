import {ICommand, Queue} from 'khusamov-base-types';
import ICommandQueuePlugin, {isProcessingBeforeEnqueuePlugin} from './ICommandQueuePlugin';

export default class CommandQueue extends Queue<ICommand> {
	private plugins: ICommandQueuePlugin[] = []

	enqueue(...commands: ICommand[]) {
		commands = this.processingBeforeEnqueue(commands)
		for (const command of commands) {
			command.commandQueue = this
		}
		super.enqueue(...commands);
	}

	addPlugin(plugin: ICommandQueuePlugin) {
		this.plugins.push(plugin)
		if (plugin.init) plugin.init(this)
	}

	private processingBeforeEnqueue(commands: ICommand[]): ICommand[] {
		const processing = (command: ICommand): ICommand => (
			this.plugins
				.filter(isProcessingBeforeEnqueuePlugin)
				.map(plugin => plugin.processingBeforeEnqueue.bind(plugin))
				.reduce<ICommand>((result, processing) => processing(command), command)
		)

		return commands.map(processing)
	}
}