import {createRoot} from 'react-dom/client';
import {resolve} from 'khusamov-inversion-of-control';
import {Timer} from 'khusamov-base-types';
import Application from './components/Application';
import './index.module.scss'
import './game/register'

resolve<Timer>('GameTimer').start()

const container = document.getElementById('application')
const root = createRoot(container!)
root.render(<Application/>)