import {ICommand} from 'khusamov-base-types';
import NotOperationCommand from '../NotOperationCommand';
import IStopable from './IStopable';

export default class StopCommand implements ICommand {
	constructor(
		private stopable: IStopable
	) {}

	public execute(): void {
		this.stopable.command.inject(new NotOperationCommand)
	}
}