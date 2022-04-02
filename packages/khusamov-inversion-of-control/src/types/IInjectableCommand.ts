import ICommand from './ICommand';

export default interface IInjectableCommand extends ICommand {
	inject(internalCommand: ICommand): void
}