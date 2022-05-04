import Queue from './Queue';
import ICommandQueuePlugin, {isProcessingBeforeEnqueuePlugin} from './ICommandQueuePlugin';
import ICommand from '../ICommand';

export interface ICommandQueueProps {
	plugins?: ICommandQueuePlugin[]
}

// TODO В классе PluginableQueue избавиться от ICommand

export default class PluginableQueue extends Queue<ICommand> {
	private plugins: ICommandQueuePlugin[] = []

	constructor(props: ICommandQueueProps = {}) {
		super();
		if (props.plugins) {
			props.plugins.forEach(plugin => this.addPlugin(plugin))
		}
	}

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