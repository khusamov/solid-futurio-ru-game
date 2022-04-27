Повторяемая команда
===================

Повторяемая команда это такая команда, которая после выполнения добавляет себя
в очередь команд. Таким образом она будет выполнена повторно. А так как она добавляет
себя в очередь без условий, то ее выполнение будет происходит бесконечно.

Создание, запуск и остановка повторяемой команды
------------------------------------------------

```typescript
import {ICommand} from 'khusamov-base-types'
import {StartCommand, StopCommand, CommandQueue, RepeatableCommand} from 'khusamov-command-system'

const commandQueue = new CommandQueue

class MyCommand implements ICommand {
	public execute(): void {
		// ...
	}
}

// Запуск и остановка при помощи команд StartCommand и StopCommand.
// Для возможности остановки команды придумайте любое уникальное в рамках universalObject имя.
commandQueue.enqueue(new StartCommand('MyCommand', universalObject, new RepeatableCommand(new MyCommand)))
commandQueue.enqueue(new StopCommand('MyCommand', universalObject))
```

Бесконечно выполняемая команда
------------------------------

Если команду не требуется останавливать, то ее можно напрямую разместить в очередь команд:

```typescript
import {ICommand} from 'khusamov-base-types'
import {CommandQueue} from 'khusamov-command-system'

const commandQueue = new CommandQueue

class MyCommand implements ICommand {
	public execute(): void {
		// ...
	}
}

// Запуск повторяемой команды, без возможности ее остановки.
commandQueue.enqueue(new RepeatableCommand(new MyCommand))
```

Запуск и остановка без StartCommand и StopCommand
---------------------------------------------

Команду можно останавливать напрямую при помощи метода `.stop()`, если сохранить на нее ссылку:

```typescript
import {ICommand} from 'khusamov-base-types'
import {CommandQueue, RepeatableCommand} from 'khusamov-command-system'

const commandQueue = new CommandQueue

class MyCommand implements ICommand {
	public execute(): void {
		// ...
	}
}

// Если команду требуется останавливать, то ее следует сохранить в отдельную переменную.
const myCommand = new RepeatableCommand(new MyCommand)

// Запуск повторяемой команды.
commandQueue.enqueue(myCommand)

// Остановка повторяемой команды.
myCommand.stop()
```