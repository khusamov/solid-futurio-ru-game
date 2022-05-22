import {createRoot} from 'react-dom/client';
import {resolve} from 'khusamov-inversion-of-control';
import {Timer} from 'khusamov-base-types';
import {CommandSystemPlugin} from './plugins/CommandSystemPlugin';
import {MechanicalMotionSystemPlugin} from './plugins/MechanicalMotionSystemPlugin';
import {GamePlugin} from './classes/GamePlugin';
import {GlobalGameObjectPlugin} from './plugins/GlobalGameObjectPlugin';
import {GameCameraPlugin} from './plugins/GameCameraPlugin';
import {GameWorldPlugin} from './plugins/GameWorldPlugin';
import {CobraSpaceshipPlugin} from './plugins/CobraSpaceshipPlugin';
import {StaticStarClusterPlugin} from './plugins/StaticStarClusterPlugin';
import Application from './components/Application';
import './index.module.scss'

const plugins: GamePlugin[] = [
	new CommandSystemPlugin,
	new MechanicalMotionSystemPlugin,
	new GlobalGameObjectPlugin,
	new GameCameraPlugin,
	new GameWorldPlugin,
	new StaticStarClusterPlugin,
	new CobraSpaceshipPlugin
]

for (const plugin of plugins) {
	plugin.init()
}

for (const plugin of plugins) {
	plugin.start()
}
resolve<Timer>('GameTimer').start()

const container = document.getElementById('application')
const root = createRoot(container!)
root.render(<Application/>)