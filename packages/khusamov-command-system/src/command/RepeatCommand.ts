import {IQueue, ICommand} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';

export default class RepeatCommand implements ICommand {
	constructor(
		private repeatedCommand: ICommand
	) {}

	public execute(): void {
		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		commandQueue.enqueue(this.repeatedCommand)
	}
}