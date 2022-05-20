import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';
import {ICommandOrder} from 'khusamov-command-system';
import {CobraEngine} from './ControlCobraSpaceshipCommand';

export interface IControlCobraSpaceshipCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'ControlCobraSpaceshipCommand'> {
	readonly targetObject: TResolveParameters<R>
	readonly engine: CobraEngine
	readonly increment: number
}