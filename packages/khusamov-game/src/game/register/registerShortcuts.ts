import {Convert, IDisposable} from 'khusamov-base-types';
import {IIncreaseForceCommandOrder, IRotateForceCommandOrder} from 'khusamov-mechanical-motion';
import IShortcutCommandOrder, {registerShortcutCommand} from '../../IShortcutCommandOrder';
import {CobraEngine, IControlCobraSpaceshipCommandOrder} from '../../command-system/commands/ControlCobraSpaceshipCommand';

const forceIncrement = 20

type TSpaceshipShortcutCommand = (
	| IShortcutCommandOrder<IIncreaseForceCommandOrder>
	| IShortcutCommandOrder<IRotateForceCommandOrder>
	| IShortcutCommandOrder<IControlCobraSpaceshipCommandOrder>
)

const increaseForceShortcut: TSpaceshipShortcutCommand = {
	key: 'W',
	command: {
		name: 'IncreaseForceCommand.IncreaseForce',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'IncreaseForceCommand',
			targetObject: ['SelectedGameObject'],
			increment: forceIncrement
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
			increment: -forceIncrement
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

const increaseLeftEngineSpaceshipShortcut: TSpaceshipShortcutCommand = {
	key: 'R',
	command: {
		name: 'ControlCobraSpaceshipCommand.IncreaseLeftEngine',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'ControlCobraSpaceshipCommand',
			targetObject: ['SelectedGameObject'],
			engine: CobraEngine.Left,
			increment: forceIncrement
		}
	}
}

const dereaseLeftEngineSpaceshipShortcut: TSpaceshipShortcutCommand = {
	key: 'F',
	command: {
		name: 'ControlCobraSpaceshipCommand.DereaseLeftEngine',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'ControlCobraSpaceshipCommand',
			targetObject: ['SelectedGameObject'],
			engine: CobraEngine.Left,
			increment: -forceIncrement
		}
	}
}

const increaseRightEngineSpaceshipShortcut: TSpaceshipShortcutCommand = {
	key: 'T',
	command: {
		name: 'ControlCobraSpaceshipCommand.IncreaseRightEngine',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'ControlCobraSpaceshipCommand',
			targetObject: ['SelectedGameObject'],
			engine: CobraEngine.Right,
			increment: forceIncrement
		}
	}
}

const dereaseRightEngineSpaceshipShortcut: TSpaceshipShortcutCommand = {
	key: 'G',
	command: {
		name: 'ControlCobraSpaceshipCommand.DereaseRightEngine',
		targetObject: ['SelectedGameObject'],
		order: {
			type: 'ControlCobraSpaceshipCommand',
			targetObject: ['SelectedGameObject'],
			engine: CobraEngine.Right,
			increment: -forceIncrement
		}
	}
}

const shortcutCommandOrders: IShortcutCommandOrder[] = [
	increaseForceShortcut,
	decreaseForceShortcut,
	cwRotateForceShortcut,
	ccwRotateForceShortcut,
	increaseLeftEngineSpaceshipShortcut,
	dereaseLeftEngineSpaceshipShortcut,
	increaseRightEngineSpaceshipShortcut,
	dereaseRightEngineSpaceshipShortcut
]

export function registerShortcuts(): IDisposable[] {
	const disposerList: IDisposable[] = []
	for (const shortcutCommandOrder of shortcutCommandOrders) {
		disposerList.push(registerShortcutCommand(shortcutCommandOrder))
	}
	return disposerList
}