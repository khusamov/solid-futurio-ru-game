import {ICommand} from 'khusamov-base-types';

/**
 * @link https://metanit.com/sharp/wpf/22.3.php
 * @link https://docs.microsoft.com/en-us/windows/communitytoolkit/mvvm/relaycommand
 */
export default class RelayCommand implements ICommand {
	public readonly name = 'RelayCommand'

	constructor(
		private action: () => void
	) {}

	execute(): void {
		this.action()
	}
}