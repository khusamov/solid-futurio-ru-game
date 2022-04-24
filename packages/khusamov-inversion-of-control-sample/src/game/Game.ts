import init from './init';
import {IUniversalObject, KeyUpDownProcessor, Queue, Timer, Vector} from 'khusamov-base-types';
import {AgentMessageInterpretCommand, CommandQueue, StartCommand} from 'khusamov-command-system';
import createSpaceship from './createSpaceship';
import createKeyboardHandlers from './createKeyboardHandlers';
import {IMovable, IMovableReflectedTypeRef, MoveCommand} from 'khusamov-game-command-system';
import {resolve} from 'khusamov-inversion-of-control';
import IGameOptions from './IGameOptions';

export default class Game {
	public gameTimer: Timer
	public gameObjectList: IUniversalObject[]
	public commandQueue: CommandQueue
	public agentMessageQueue: Queue<IUniversalObject>
	public keyUpDownProcessor: KeyUpDownProcessor

	public constructor(options: IGameOptions) {
		const {gameTimer, gameObjectList, commandQueue, agentMessageQueue, keyUpDownProcessor} = init(options)
		this.gameTimer = gameTimer
		this.gameObjectList = gameObjectList
		this.commandQueue = commandQueue
		this.agentMessageQueue = agentMessageQueue
		this.keyUpDownProcessor = keyUpDownProcessor

		const theSpaceship = createSpaceship()
		gameObjectList.push(theSpaceship)
		commandQueue.enqueue(createSpaceshipStartMoveCommand(theSpaceship))

		commandQueue.enqueue(new AgentMessageInterpretCommand)
		createKeyboardHandlers(keyUpDownProcessor, agentMessageQueue)
	}

	public start() {
		this.gameTimer.start()
	}
}


/**
 * Создаем команду Поступательное движение космолета.
 * TODO Может это упростить? Создание абстрактной команды StartCommand.
 * @param theSpaceship
 */
function createSpaceshipStartMoveCommand(theSpaceship: IUniversalObject) {
	return (
		new StartCommand(
			new MoveCommand(
				resolve<IMovable>('Adapter', theSpaceship, IMovableReflectedTypeRef),
				new Vector(500, 500)
			),
			'MoveCommand',
			theSpaceship
		)
	)
}