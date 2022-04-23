Повторяемая команда
===================

Два способа создания повторяемых команд:

При помощи декоратора
---------------------

Этот способ нужен для создания команд, которые не требуется останавливать.

Повторяемые команды следует помечать декоратором @repeatable, 
а в очередь команд требуется добавлять плагин RepeatablePlugin.

При помощи StartCommand
-----------------------

Этот способ нужен для создания команд, которые требуется останавливать.

Для старта команды следует создать:
new StartCommand(transformForceCommand, 'TransformForce', targetObject)
где transformForceCommand является просто командой, которая в конструкторе StartCommand обернется в RepeatableCommand.

А для остановки команды следует создать:
new StopCommand('TransformForce', targetObject)








```typescript
import StartCommand from './StartCommand';
import StopCommand from './StopCommand';
import {IUniversalObject} from 'khusamov-base-types';
import {UniversalObject} from 'khusamov-inversion-of-control';

const universalObject: IUniversalObject = new UniversalObject

new StartCommand('DecreaseForceAngleCommand', universalObject)
new StopCommand('DecreaseForceAngleCommand', universalObject)

// Если команда DecreaseForceAngleCommand принимает дополнительные параметры, 
// то их можно передать в любом количестве.
const additionalParameters = []
new StartCommand('DecreaseForceAngleCommand', universalObject, ...additionalParameters)
```