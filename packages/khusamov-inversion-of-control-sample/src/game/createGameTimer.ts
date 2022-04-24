import {CommandQueue} from 'khusamov-command-system';
import {Timer} from 'khusamov-base-types';

/**
 * Создать игровой таймер.
 * Это бесконечный цикл по извлечению и выполнению команд из очереди команд.
 * @param timeout
 * @param commandQueue
 */
export default function createGameTimer(timeout: number, commandQueue: CommandQueue): Timer {
	const gameTimer = new Timer(timeout, () => {
		// Извлечь очередную команду.
		const command = commandQueue.dequeue()

		if (command) {
			// Контроль для отладки.
			//console.log(gameTimer.interval, command.name)

			// Выполнить команду.
			command.execute()
		}
	})

	return gameTimer
}