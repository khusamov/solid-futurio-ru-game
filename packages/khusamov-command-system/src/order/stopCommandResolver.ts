import {reflect} from 'typescript-rtti';
import {ITyped, IUniversalObject, toOneLine} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import StopCommand from '../command/StopCommand';
import IStopOrder from './IStopOrder';

/**
 * Функция для создания команды StopCommand на основе приказа.
 *
 * Приказ: createUniversalObject<IStopOrder>({type='StopCommand', ...})
 * Зависимость: register('StopCommand', stopCommandResolver)
 *
 * @param stopOrderObject
 */
export default function stopCommandResolver(stopOrderObject: IUniversalObject): StopCommand {
	const stopOrder: IStopOrder = resolve<IStopOrder>('Adapter', stopOrderObject, reflect<IStopOrder>())
	const {stoppableCommandName, targetObjectSearchData} = stopOrder

	const targetObject = resolve<IUniversalObject | undefined>(targetObjectSearchData.type, targetObjectSearchData)
	if (!targetObject) throw new NotFoundTargetObjectError(targetObjectSearchData)

	return new StopCommand(stoppableCommandName, targetObject)
}

class NotFoundTargetObjectError extends Error {
	public constructor(targetObjectSearchData: ITyped & Record<string, any>) {
		const message = `
			Для IStopOrder не найден targetObject 
			типа '${targetObjectSearchData.type}'
			с параметрами '${Object.entries(targetObjectSearchData).toString()}'
		`
		super(toOneLine(message))
	}
}


