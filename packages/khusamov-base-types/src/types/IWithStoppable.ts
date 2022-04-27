/**
 * Ключ к останавливаемой команде. Уникальное имя команды.
 */
import IStoppable from './IStoppable';

export type TStoppableKey = string

/**
 * Объект, имеющий карту объектов, которые можно останавливать.
 */
export default interface IWithStoppable<S extends IStoppable = IStoppable> {
	/**
	 * Карта объектов, которые можно останавливать.
	 *
	 * Внимание, карты может и не быть, в этом случае ее можно создать извне.
	 * Это важный момент, так как интерфейс IWithStoppable предназначен
	 * в первую очередь для работы совместно с интерфейсом IUniversalObject,
	 * у которого метод getValue() может вернуть undefined.
	 */
	stoppableMap: Map<TStoppableKey, S> | undefined
}