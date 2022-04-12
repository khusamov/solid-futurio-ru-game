import {IStoppable} from 'khusamov-base-types';

/**
 * Ключ к останавливаемой команде. Уникальное имя команды.
 *
 * Сейчас это просто строка, например имя команды.
 * А можно было бы сделать ссылкой на класс команды, но сейчас экземпляр
 * команды создается не напрямую, а косвенно через функцию resolve()
 * в классе StartCommand (targetCommand = resolve(...)).
 * Поэтому в качестве ключа возможно использовать только строку.
 */
export type TStoppableKey = string

export default interface IObjectWithStoppable {
	stoppableCommandMap: Map<TStoppableKey, IStoppable> | undefined
}