import {Timer} from 'khusamov-base-types';
import {TCommandQueue} from './types';

const DEBUG_DEFAULT = false

/**
 * Создать игровой таймер.
 * Это бесконечный цикл по извлечению и выполнению команд из очереди команд.
 */
export default function createGameTimer(timeout: number, commandQueue: TCommandQueue, debug: boolean = DEBUG_DEFAULT): Timer {
	return (
		debug
			? (
				new Timer(
					timeout,
					() => {
						const command = commandQueue.dequeue()
						if (command) {
							console.log(command.name)
							command.execute()
						}
					}
				)
			)
			: ( // TODO Переделать выполнение команд. Надо чтобы следующий execute() сразу выполнялся после предыдущего.
				//  А тут возможны даже наложения, когда execute() не закончился, а уже вызывается следующий execute().
				// https://www.youtube.com/watch?v=-gsjAz9jR3Y
				// https://eatdog.com.ua/assets/gamedev-slides/
				// http://gs-studio.com/news-about-it/30703----javascript
				new Timer(
					timeout,
					() => commandQueue.dequeue()?.execute()
				)
			)
	)
}