import {Convert, IDisposable} from 'khusamov-base-types';
import {IIncreaseForceCommandOrder, IRotateForceCommandOrder} from 'khusamov-mechanical-motion';
import IShortcutCommandOrder, {registerShortcutCommand} from '../../IShortcutCommandOrder';

type TSpaceshipShortcutCommand = (
	| IShortcutCommandOrder<IIncreaseForceCommandOrder>
	| IShortcutCommandOrder<IRotateForceCommandOrder>
	)

const increaseForceShortcut: TSpaceshipShortcutCommand = {
	key: 'W',
	command: {
		name: 'IncreaseForceCommand.IncreaseForce',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'IncreaseForceCommand',
			targetObject: ['SelectedGameObject'],
			increment: 200
		}
	}
}

const decreaseForceShortcut: TSpaceshipShortcutCommand = {
	key: 'S',
	command: {
		name: 'IncreaseForceCommand.DecreaseForce',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'IncreaseForceCommand',
			targetObject: ['SelectedGameObject'],
			increment: -200
		}
	}
}

const cwRotateForceShortcut: TSpaceshipShortcutCommand = {
	key: 'A',
	command: {
		name: 'RotateForceCommand.Clockwise',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'RotateForceCommand',
			targetObject: ['SelectedGameObject'],
			increment: -Convert.toRadian(1)
		}
	}
}

const ccwRotateForceShortcut: TSpaceshipShortcutCommand = {
	key: 'D',
	command: {
		name: 'RotateForceCommand.Counterclockwise',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'RotateForceCommand',
			targetObject: ['SelectedGameObject'],
			increment: Convert.toRadian(1)
		}
	}
}

const shortcutCommandOrders: IShortcutCommandOrder[] = [
	increaseForceShortcut,
	decreaseForceShortcut,
	cwRotateForceShortcut,
	ccwRotateForceShortcut
]

export function registerShortcuts(): IDisposable[] {
	const disposerList: IDisposable[] = []
	for (const shortcutCommandOrder of shortcutCommandOrders) {
		disposerList.push(registerShortcutCommand(shortcutCommandOrder))
	}
	return disposerList
}