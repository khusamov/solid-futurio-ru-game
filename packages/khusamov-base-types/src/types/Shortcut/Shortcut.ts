import IDisposable from '../IDisposable';
import IKeyboardListeners from './IKeyboardListeners';
import ShortcutDispatcher from './ShortcutDispatcher';

export default class Shortcut {
	public static register(key: string, listeners: IKeyboardListeners): IDisposable {
		return ShortcutDispatcher.instance.register(key, listeners)
	}
}