import Queue, {IQueue} from './Queue';

export default interface ICommand {
	execute(): void
	commandQueue?: IQueue<ICommand>
}