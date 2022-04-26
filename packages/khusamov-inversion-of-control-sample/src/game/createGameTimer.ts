import {CommandQueue} from 'khusamov-command-system';
import {Timer} from 'khusamov-base-types';

/**
 * Создать игровой таймер.
 * Это бесконечный цикл по извлечению и выполнению команд из очереди команд.
 * @param timeout
 * @param commandQueue
 */
export default function createGameTimer(timeout: number, commandQueue: CommandQueue): Timer {
	return new Timer(
		timeout,
		() => commandQueue.dequeue()?.execute()
	)
}