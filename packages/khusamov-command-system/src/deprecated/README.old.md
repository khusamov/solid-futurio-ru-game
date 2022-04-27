Повторяемая команда
===================

Повторяемая команда это такая команда, которая после выполнения добавляет себя
в очередь команд. Таким образом она будет выполнена повторно. А так как она добавляет
себя в очередь без условий, то ее выполнение будет происходит бесконечно.

Создание повторяемой команды с нуля
-----------------------------------

Для создания повторяемой команды следует использовать декоратор класса `@repeatable`:

```typescript
import {ICommand} from 'khusamov-base-types'
import {repeatable} from 'khusamov-command-system'

@repeatable
class MyCommand implements ICommand {
	public execute(): void {
		// ...
	}
}
```

Подготовка очереди команд
-------------------------

Внимание! Для работы декоратора `@repeatable` необходимо обязательно добавление
плагина `RepeatablePlugin` в очередь команд:

```typescript
import {CommandQueue, RepeatablePlugin} from 'khusamov-command-system'

const commandQueue = new CommandQueue({plugins: [new RepeatablePlugin]})
```

Запуск и остановка повторяемой команды
--------------------------------------

Для запуска и остановки повторяемой команды следует воспользоваться
специальными командами `StartCommand` и `StopCommand`:

```typescript
import {StartCommand, StopCommand, CommandQueue, RepeatablePlugin} from 'khusamov-command-system'
import MyCommand from './MyCommand'

const commandQueue = new CommandQueue({plugins: [new RepeatablePlugin]})

// Запуск повторяемой команды.
// Для возможности остановки команды придумайте любое уникальное в рамках universalObject имя.
// Внимание, здесь класс MyCommand помечен декоратором @repeatable.
commandQueue.enqueue(new StartCommand('MyCommand', universalObject, new MyCommand))

// Остановка повторяемой команды.
commandQueue.enqueue(new StopCommand('MyCommand', universalObject))
```

Бесконечно выполняемая команда
------------------------------

Если команду не требуется останавливать, то ее можно напрямую разместить в очередь команд:

```typescript
import {CommandQueue, RepeatablePlugin} from 'khusamov-command-system'
import MyCommand from './MyCommand'

const commandQueue = new CommandQueue({plugins: [new RepeatablePlugin]})

// Запуск повторяемой команды, без возможности ее остановки.
// Внимание, здесь MyCommand помечен декоратором @repeatable.
commandQueue.enqueue(new MyCommand)
```

Как превратить обычную команду в повторяемую?
---------------------------------------------

Если есть команда, которую надо превратить в повторяемую, то сделать это можно
при помощи команды `RepeatableCommand`. Такую команду можно запускать и останавливать при помощи
специальных команд `StartCommand` и `StopCommand`. А также можно останавливать напрямую
при помощи метода `.stop()`:

```typescript
import {ICommand} from 'khusamov-base-types'
import {CommandQueue} from 'khusamov-command-system'

// Внимание, здесь не используется плагин RepeatablePlugin,  
// так как мы вручную обертываем команду в new RepeatableCommand().
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

// Запуск и остановка при помощи команд StartCommand и StopCommand.
commandQueue.enqueue(new StartCommand('MyCommand', universalObject, myCommand))
commandQueue.enqueue(new StopCommand('MyCommand', universalObject))
```