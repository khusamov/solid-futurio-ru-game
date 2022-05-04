import {ICommand, IQueue, Queue} from 'khusamov-base-types';

export type TCommandQueue = IQueue<ICommand>

/**
 * Создать очередь команд.
 *
 * Отличие от обычной очереди: перед добавление команды в очередь
 * в свойство команды commandQueue помещается ссылка на саму очередь.
 */
export default function createCommandQueue() {
	const commandQueueProxy = (
		new Proxy(new Queue as TCommandQueue, {
			get(target, property, receiver) {
				const origin = Reflect.get(target, property, receiver)
				if (property === 'enqueue') {
					const originEnqueue = origin as TCommandQueue['enqueue']
					return (
						function proxyEnqueue(...items: ICommand[]): void {
							items.forEach(item => item.commandQueue = commandQueueProxy)
							originEnqueue.call(target, ...items)
						}
					)
				}
				return origin
			}
		})
	)

	return commandQueueProxy
}