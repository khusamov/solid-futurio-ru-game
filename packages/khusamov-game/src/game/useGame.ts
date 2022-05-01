import {useEffect} from 'react';
import {GameLoop} from 'khusamov-base-types';

const gameLoop = new GameLoop

export default function useGame() {
	useEffect(() => {
		gameLoop.on('update', step => {})
		gameLoop.on('render', timeInterval => {})
	}, [])
}