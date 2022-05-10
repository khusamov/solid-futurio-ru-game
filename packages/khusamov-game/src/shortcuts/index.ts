import IMoveTransformCommandOrder from '../orders/IMoveTransformCommandOrder';
import IShortcutCommand, {registerShortcutCommand} from './IShortcutCommand';
import {Angle, IDisposable} from 'khusamov-base-types';
import {RotateDirectionType} from 'khusamov-mechanical-motion';

const {Clockwise, Counterclockwise} = RotateDirectionType

const increaseForceShortcut: IShortcutCommand<IMoveTransformCommandOrder> = {
	key: 'W',
	command: {
		name: 'IncreaseForce',
		order: {
			type: 'MoveTransformCommand',
			action: ['MoveTransformAction.IncreaseForce', 200]
		}
	}
}

const decreaseForceShortcut: IShortcutCommand<IMoveTransformCommandOrder> = {
	key: 'S',
	command: {
		name: 'IncreaseForce',
		order: {
			type: 'MoveTransformCommand',
			action: ['MoveTransformAction.DecreaseForce', 200]
		}
	}
}

const cwRotateForceShortcut: IShortcutCommand<IMoveTransformCommandOrder> = {
	key: 'A',
	command: {
		name: 'RotateForce.Clockwise',
		order: {
			type: 'MoveTransformCommand',
			action: ['MoveTransformAction.RotateForce', Angle.toRadian(1), Clockwise]
		}
	}
}

const ccwRotateForceShortcut: IShortcutCommand<IMoveTransformCommandOrder> = {
	key: 'D',
	command: {
		name: 'RotateForce.Counterclockwise',
		order: {
			type: 'MoveTransformCommand',
			action: ['MoveTransformAction.RotateForce', Angle.toRadian(1), Counterclockwise]
		}
	}
}

const shortcutCommands: IShortcutCommand[] = [
	increaseForceShortcut,
	decreaseForceShortcut,
	cwRotateForceShortcut,
	ccwRotateForceShortcut
]

export function registerShortcuts(): IDisposable[] {
	const disposerList: IDisposable[] = []
	for (const shortcutCommand of shortcutCommands) {
		disposerList.push(registerShortcutCommand(shortcutCommand))
	}
	return disposerList
}



