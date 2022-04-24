import Game from './Game';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Timer} from 'khusamov-base-types';

interface IGameWrap {
	game: Game | undefined
}

function createRenderTimer(timeout: number, game: Game, setGameWrap: Dispatch<SetStateAction<IGameWrap>>) {
	return (
		new Timer(timeout, function() {
			setGameWrap({game})
		})
	)
}

export interface IGameParams {
	renderTimeout: number
	gameTimeout: number
}

export default function useGame({renderTimeout, gameTimeout}: IGameParams) {
	const [gameWrap, setGameWrap] = useState<IGameWrap>({game: undefined})

	useEffect(() => {
		const game = new Game({timeout: gameTimeout})
		const renderTimer = createRenderTimer(renderTimeout, game, setGameWrap)
		game.start()
		renderTimer.start()
	}, [])

	return [gameWrap.game]
}