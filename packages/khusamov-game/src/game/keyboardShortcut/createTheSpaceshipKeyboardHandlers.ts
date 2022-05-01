import {IQueue, onKeyUp, onKeyDown} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IMoveTransformOrder from '../order/IMoveTransformOrder';
import IStopOrder from '../order/IStopOrder';

type TUniversalObject = Record<string, any>
type TOrderQueue = IQueue<TUniversalObject>

const keyboardShortcutMoveTransformMap: Record<string, string> = {
	w: 'MoveTransform:IncreaseForce',
	s: 'MoveTransform:DecreaseForce',
	a: 'MoveTransform:ClockwiseRotateForce',
	d: 'MoveTransform:CounterclockwiseRotateForce'
}

/**
 * Создает обработчики нажатия клавишь управления кораблем.
 * Обработчики создают приказы и отправляют их в очередь приказов OrderQueue.
 */
export default function createTheSpaceshipKeyboardHandlers() {
	const orderQueue = resolve<TOrderQueue>('OrderQueue')
	for (const key in keyboardShortcutMoveTransformMap) {
		if (!keyboardShortcutMoveTransformMap.hasOwnProperty(key)) continue
		const moveTransformOrder: IMoveTransformOrder = {
			type: 'StartMoveTransform',
			transform: keyboardShortcutMoveTransformMap[key],
			target: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		}
		const stopOrder: IStopOrder = {
			type: 'Stop',
			command: keyboardShortcutMoveTransformMap[key],
			target: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		}
		createKeyboardShortcut(key, {
			start: () => orderQueue.enqueue(moveTransformOrder),
			stop: () => orderQueue.enqueue(stopOrder)
		})
	}
}

function createKeyboardShortcut(key: string, actions: {start: Function, stop: Function}) {
	document.addEventListener('keydown', onKeyDown(event => {
		if (event.code === 'Key' + key.toUpperCase()) {
			actions.start()
		}
	}))
	document.addEventListener('keyup', onKeyUp(event => {
		if (event.code === 'Key' + key.toUpperCase()) {
			actions.stop()
		}
	}))
}