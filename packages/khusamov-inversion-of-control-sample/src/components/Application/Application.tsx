import Canvas from '../Canvas';
import useApplication from './useApplication';

export default function Application() {
	useApplication()
	return (
		<div>
			<div>
				<Canvas/>
			</div>
		</div>
	)
}