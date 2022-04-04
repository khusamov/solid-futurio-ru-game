import {ICommand, IQueue, IInjectableCommand} from 'khusamov-base-types';
import {IoC} from 'khusamov-inversion-of-control';
import IStartable from './IStartable';

export default class StartCommand implements ICommand {
	constructor(
		private startable: IStartable,
		private longTimeCommand: IInjectableCommand
	) {}

	public execute(): void {
		const commandQueue = IoC.resolve<IQueue<ICommand>>('CommandQueue')
		this.startable.command = this.longTimeCommand
		commandQueue.enqueue(this.longTimeCommand)
	}
}