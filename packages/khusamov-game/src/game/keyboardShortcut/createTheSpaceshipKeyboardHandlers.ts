import {IQueue, onKeyUp, onKeyDown, IDisposable, Angle} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IStartMoveTransformOrder, {TTransformActionParams} from '../order/IStartMoveTransformOrder';
import IStopOrder from '../order/IStopOrder';

type TUniversalObject = Record<string, any>
type TOrderQueue = IQueue<TUniversalObject>

const keyboardShortcutMoveTransformMap: Record<string, TTransformActionParams> = {
	w: ['IncreaseForce', 200],
	s: ['DecreaseForce', 200],
	a: ['ClockwiseRotateForce', Angle.toRadian(1)],
	d: ['CounterclockwiseRotateForce', Angle.toRadian(1)]
}

/**
 * Создает обработчики нажатия клавишь управления кораблем.
 * Обработчики создают приказы и отправляют их в очередь приказов OrderQueue.
 */
export default function createTheSpaceshipKeyboardHandlers(): IDisposable {
	const disposerList: IDisposable[] = []
	const orderQueue = resolve<TOrderQueue>('OrderQueue')
	for (const key in keyboardShortcutMoveTransformMap) {
		if (!keyboardShortcutMoveTransformMap.hasOwnProperty(key)) continue
		const moveTransformOrder: IStartMoveTransformOrder = {
			type: 'StartMoveTransform',
			transformAction: keyboardShortcutMoveTransformMap[key],
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		}
		const stopOrder: IStopOrder = {
			type: 'Stop',
			command: 'MoveTransform.' + keyboardShortcutMoveTransformMap[key][0],
			targetObject: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		}
		disposerList.push(
			createKeyboardShortcut(key, {
				start: () => orderQueue.enqueue(moveTransformOrder),
				stop: () => orderQueue.enqueue(stopOrder)
			})
		)
	}
	return {
		dispose() {
			for (const disposer of disposerList) {
				disposer.dispose()
			}
		}
	}
}

/**
 * Создает два обработчика на keydown и keyup для document.
 * Причем повторная генерация событий keydown блокируется.
 * Возвращает объект с методом dispose() для отмены клавиатурных сочетаний.
 * @param key Название кнопки по ее букве.
 * @param actions Обработчики.
 */
function createKeyboardShortcut(key: string, actions: {start: Function, stop: Function}): IDisposable {
	const keyDownHandler = onKeyDown(event => {
		if (event.code === 'Key' + key.toUpperCase()) {
			actions.start()
		}
	})
	const keyUpHandler = onKeyUp(event => {
		if (event.code === 'Key' + key.toUpperCase()) {
			actions.stop()
		}
	})
	document.addEventListener('keydown', keyDownHandler)
	document.addEventListener('keyup', keyUpHandler)
	return {
		dispose() {
			document.removeEventListener('keydown', keyDownHandler)
			document.removeEventListener('keyup', keyUpHandler)
		}
	}
}