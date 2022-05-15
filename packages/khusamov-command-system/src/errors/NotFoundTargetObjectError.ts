import {toOneLine} from 'khusamov-base-types';
import {TResolveParameters, TResolver} from 'khusamov-inversion-of-control';

export class NotFoundTargetObjectError<R extends TResolver> extends Error {
	public constructor(targetObjectResolveParameters: TResolveParameters<R>) {
		super(
			toOneLine(
				`
					Не найден targetObject 
					типа '${targetObjectResolveParameters[0]}'
					с параметрами '${JSON.stringify((targetObjectResolveParameters as any[]).slice(1))}'
				`
			)
		)
	}
}