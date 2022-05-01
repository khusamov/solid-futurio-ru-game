import {ISize} from 'khusamov-base-types';
import createTheSpaceshipKeyboardHandlers from './keyboardShortcut/createTheSpaceshipKeyboardHandlers';

export default class Game {
	public worldSize: ISize = {width: 0, height: 0}

	constructor() {
		createTheSpaceshipKeyboardHandlers()
	}
}