import {IInjectableCommand} from 'khusamov-base-types';

export default interface IStartStopObject {
	startStopCommands: Map<string, IInjectableCommand>
}