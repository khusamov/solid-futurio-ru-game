import {createUniversalObject} from 'khusamov-base-types';
import {IStopOrder} from 'khusamov-command-system';

export default function createTransformForceStopMessage(stoppableCommandName: string) {
	return (
		createUniversalObject<IStopOrder>({
			type: 'StopCommand',
			stoppableCommandName,
			targetObjectSearchData: {
				type: 'GameObject',
				name: 'theSpaceship'
			}
		})
	)
}