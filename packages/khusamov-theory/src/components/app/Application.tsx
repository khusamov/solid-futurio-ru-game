import {ApplicationStyle} from './Application.module.scss';
import {GameLoop1} from '../gameLoop/GameLoop1/GameLoop1';
import {GameLoop2} from '../gameLoop/GameLoop2/GameLoop2';
import {GameLoop3} from '../gameLoop/GameLoop3/GameLoop3';
import {GameLoop4} from '../gameLoop/GameLoop4/GameLoop4';

export function Application() {
	return (
		<div className={ApplicationStyle}>
			<div><GameLoop1/></div>
			<div><GameLoop2/></div>
			<div><GameLoop3/></div>
			<div><GameLoop4/></div>
		</div>
	)
}