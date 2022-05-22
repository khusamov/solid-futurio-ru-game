import {createRoot} from 'react-dom/client';
import {CommandSystemPlugin} from './plugins/CommandSystemPlugin';
import {MechanicalMotionSystemPlugin} from './plugins/MechanicalMotionSystemPlugin';
import {GlobalGameObjectPlugin} from './plugins/GlobalGameObjectPlugin';
import {GameCameraPlugin} from './plugins/GameCameraPlugin';
import {GameWorldPlugin} from './plugins/GameWorldPlugin';
import {CobraSpaceshipPlugin} from './plugins/CobraSpaceshipPlugin';
import {StaticStarClusterPlugin} from './plugins/StaticStarClusterPlugin';
import Application from './components/Application';
import {Game} from './classes/Game';
import './index.module.scss'

const game = new Game([
	new CommandSystemPlugin,
	new MechanicalMotionSystemPlugin,
	new GlobalGameObjectPlugin,
	new GameCameraPlugin,
	new GameWorldPlugin,
	new StaticStarClusterPlugin,
	new CobraSpaceshipPlugin
])

game.start()

const container = document.getElementById('application')
const root = createRoot(container!)
root.render(<Application/>)