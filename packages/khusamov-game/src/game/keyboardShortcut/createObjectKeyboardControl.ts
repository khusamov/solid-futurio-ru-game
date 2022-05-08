import {IDisposable, Angle, Shortcut} from 'khusamov-base-types';
import {createUniversalObject, IUniversalObject} from 'khusamov-universal-object';
import {resolve} from 'khusamov-inversion-of-control';
import {TOrderQueue} from 'khusamov-command-system';
import IStartMoveTransformOrder, {TTransformActionParams} from '../order/IStartMoveTransformOrder';
import GameObjectAdapter from '../gameObject/GameObjectAdapter';
import IStopOrder from '../order/IStopOrder';

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

		const transformActionParams = keyboardShortcutMoveTransformMap[key]
		if (!transformActionParams) {
			throw new Error('Не найдены параметры действия')
		}

		disposerList.push(
			Shortcut.register(key, {
				down() {
					resolve<TOrderQueue>('OrderQueue').enqueue(
						createMoveTransformOrder(
							transformActionParams,
							getSelectedGameObjectName()
						)
					)
				},
				up() {
					resolve<TOrderQueue>('OrderQueue').enqueue(
						createStopOrder(
							transformActionParams[0],
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