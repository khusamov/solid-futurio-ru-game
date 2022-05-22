import {GamePlugin} from '../../classes/GamePlugin';
import {register} from 'khusamov-inversion-of-control';
import {updateCobraSpaceshipCommandResolver} from './UpdateCobraSpaceshipCommand';
import {controlCobraSpaceshipCommandResolver} from './ControlCobraSpaceshipCommand';
import {registerShortcuts} from './registerShortcuts';
import registerHeroSpaceship from './registerHeroSpaceship';

export class CobraSpaceshipPlugin extends GamePlugin {
	init(): void {
		register('UpdateCobraSpaceshipCommand', updateCobraSpaceshipCommandResolver)
		register('ControlCobraSpaceshipCommand', controlCobraSpaceshipCommandResolver)
		registerShortcuts()
		registerHeroSpaceship()
	}
}