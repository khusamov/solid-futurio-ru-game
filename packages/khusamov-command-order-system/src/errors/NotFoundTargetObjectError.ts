import {toOneLine} from 'khusamov-base-types';
import {TResolveParameters, TResolverFunction} from 'khusamov-inversion-of-control';

export default class NotFoundTargetObjectError<R extends TResolverFunction> extends Error {
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