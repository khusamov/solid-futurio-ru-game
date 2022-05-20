import {ICommandOrder} from 'khusamov-command-system';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export interface IUpdateCobraSpaceshipCommandOrder<R extends TResolver = TResolver> extends ICommandOrder<'UpdateCobraSpaceshipCommand'> {
	readonly targetObject: TResolveParameters<R>
}