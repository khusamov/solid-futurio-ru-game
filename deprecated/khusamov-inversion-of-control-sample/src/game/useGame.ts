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

export interface IUseGameParams {
	renderTimeout: number
	game: Game
}

export default function useGame({renderTimeout, game}: IUseGameParams) {
	const [_, setGameWrap] = useState<IGameWrap>({game: undefined})
	useEffect(() => {
		const renderTimer = createRenderTimer(renderTimeout, game, setGameWrap)
		game.start()
		renderTimer.start()
		return () => {
			// TODO Подумать как поменять на stop(), потому что здесь нужно уничтожать таймер, а не ставить на паузу.
			//  Возможно стоит сделать GameState для возможности восстановления игры при помощи new Game(savedGameState).
			game.pause()
			renderTimer.pause()
		}
	}, [])
}