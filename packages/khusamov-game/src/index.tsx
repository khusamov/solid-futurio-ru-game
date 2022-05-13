import ReactDOM from 'react-dom'
import {resolve} from 'khusamov-inversion-of-control';
import {Timer} from 'khusamov-base-types';
import Application from './components/Application';
import './index.module.scss'
import './game/register'

resolve<Timer>('GameTimer').start()

ReactDOM.render(<Application/>, document.getElementById('application'))