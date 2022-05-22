import {GamePlugin} from './GamePlugin';
import {resolve} from 'khusamov-inversion-of-control';
import {Timer} from 'khusamov-base-types';

export class Game {
	public constructor(private plugins: GamePlugin[]) {
		for (const plugin of plugins) {
			plugin.init()
		}
	}

	public start() {
		for (const plugin of this.plugins) {
			plugin.start()
		}
		resolve<Timer>('GameTimer').start()
	}
}