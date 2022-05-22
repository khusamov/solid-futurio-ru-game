import {register} from 'khusamov-inversion-of-control';
import {
	createCommandQueue, InterpretOrderCommand,
	relayCommandResolver, RepeatableCommand,
	startCommandResolver,
	stopCommandResolver,
	TCommandQueue,
	TOrderQueue
} from 'khusamov-command-system';
import {GamePlugin} from '../../classes/GamePlugin';
import createOrderQueue from './createOrderQueue';
import {EventEmitter} from 'events';

const LOG = false

export class CommandSystemPlugin extends GamePlugin {
	private readonly commandQueue: TCommandQueue
	private readonly orderQueue: TOrderQueue
	private readonly commandQueueEventEmitter: EventEmitter

	constructor() {
		super();
		this.orderQueue = createOrderQueue(LOG)
		this.commandQueue = createCommandQueue() // Очередь команд создается по особому!
		this.commandQueueEventEmitter = new EventEmitter() // Используется в createGameTimer() и DestroyCommand.
	}

	public init(): void {
		register('StartCommand', startCommandResolver)
		register('StopCommand', stopCommandResolver)
		register('RelayCommand', relayCommandResolver)
		register('OrderQueue', () => this.orderQueue)
		register('CommandQueue', () => this.commandQueue)
		register('CommandQueue.EventEmitter', () => this.commandQueueEventEmitter)
	}

	public override start() {
		super.start();
		this.commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))
	}
}