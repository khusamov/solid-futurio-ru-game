Повторяемая команда
===================

Или длительная команда, которая выполняется на каждом цикле и которую можно остановить.

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