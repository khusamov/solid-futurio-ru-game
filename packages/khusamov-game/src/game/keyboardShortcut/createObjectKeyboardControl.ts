import {onKeyUp, onKeyDown, IDisposable, Angle, Shortcut} from 'khusamov-base-types';
import {resolve} from 'khusamov-inversion-of-control';
import IStartMoveTransformOrder, {TTransformActionParams} from '../order/IStartMoveTransformOrder';
import IStopOrder from '../order/IStopOrder';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import GameObjectAdapter from '../gameObject/GameObjectAdapter';
import {TOrderQueue} from 'khusamov-command-system';

const keyboardShortcutMoveTransformMap: Record<string, TTransformActionParams> = {
	w: ['IncreaseForce', 200],
	s: ['DecreaseForce', 200],
	a: ['ClockwiseRotateForce', Angle.toRadian(1)],
	d: ['CounterclockwiseRotateForce', Angle.toRadian(1)]
}

function getSelectedGameObjectName(): string {
	const selectedGameObject = resolve<IUniversalObject>('SelectedGameObject')
	return new GameObjectAdapter(selectedGameObject).name
}

function createMoveTransformOrder(transformAction: TTransformActionParams, targetObjectName: string) {
	return (
		createUniversalObject<IStartMoveTransformOrder>({
			type: 'StartMoveTransform',
			transformAction,
			targetObject: {
				type: 'GameObject',
				name: targetObjectName
			}
		})
	)
}

function createStopOrder(transformActionName: string, targetObjectName: string) {
	return (
		createUniversalObject<IStopOrder>({
			type: 'Stop',
			command: 'MoveTransform.' + transformActionName,
			targetObject: {
				type: 'GameObject',
				name: targetObjectName
			}
		})
	)
}

/**
 * Создает обработчики нажатия клавишь управления выбранным игровым объектом.
 * Обработчики создают приказы и отправляют их в очередь приказов OrderQueue.
 */
export default function createObjectKeyboardControl(): IDisposable {
	const disposerList: IDisposable[] = []
	for (const key in keyboardShortcutMoveTransformMap) {
		if (!keyboardShortcutMoveTransformMap.hasOwnProperty(key)) continue
		disposerList.push(
			Shortcut.register(key, {
				down() {
					resolve<TOrderQueue>('OrderQueue').enqueue(
						createMoveTransformOrder(
							keyboardShortcutMoveTransformMap[key],
							getSelectedGameObjectName()
						)
					)
				},
				up() {
					resolve<TOrderQueue>('OrderQueue').enqueue(
						createStopOrder(
							keyboardShortcutMoveTransformMap[key][0],
							getSelectedGameObjectName()
						)
					)
				}
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

// interface IActions {
// 	start: Function
// 	stop: Function
// }
//
// /**
//  * Создает два обработчика на keydown и keyup для document.
//  * Причем повторная генерация событий keydown блокируется.
//  * Возвращает объект с методом dispose() для отмены клавиатурных сочетаний.
//  * @param key Название кнопки по ее букве.
//  * @param actions Обработчики.
//  */
// function createKeyboardShortcut(key: string, actions: IActions): IDisposable {
// 	const keyDownHandler = onKeyDown(event => {
// 		console.log('---------keyDownHandler', event.code)
// 		if (event.code === 'Key' + key.toUpperCase()) {
// 			actions.start()
// 		}
// 	})
// 	const keyUpHandler = onKeyUp(event => {
// 		console.log('---------keyUpHandler', event.code)
// 		if (event.code === 'Key' + key.toUpperCase()) {
// 			actions.stop()
// 		}
// 	})
// 	document.addEventListener('keydown', keyDownHandler)
// 	document.addEventListener('keyup', keyUpHandler)
// 	return {
// 		dispose() {
// 			document.removeEventListener('keydown', keyDownHandler)
// 			document.removeEventListener('keyup', keyUpHandler)
// 		}
// 	}
// }