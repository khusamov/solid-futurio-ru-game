Интерпретация приказов клиента
==============================

```typescript
import {ICommand, Queue} from 'khusamov-base-types'
import {InterpretOrderCommand, RepeatableCommand} from './khusamov-command-system'
import {register} from 'khusamov-inversion-of-control'

const commandQueue: Queue<ICommand> = new Queue
const orderQueue: Queue<IOrder> = new Queue

register('OrderQueue', () => orderQueue)

commandQueue.enqueue(new RepeatableCommand(new InterpretOrderCommand))
```