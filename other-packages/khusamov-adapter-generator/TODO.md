TODO
====

1) В адаптерах похоже нужно отказаться от типизации свойств.

Сейчас адаптер выводится таким:

```typescript
import { Vector } from 'khusamov-base-types';

/**
 * Интерфейс объекта, который может поступательно перемещаться. */
export default class MovableAdapter implements IMovable {
        constructor(private universalObject: IUniversalObject) {}
        /**
         * Текущее время миллисекундах. */
        get time(): number {
                return this.universalObject.getValue<number>('time');
        }
        set time(value: number) {
                return this.universalObject.setValue<number>('time', value);
        }
}
```

Для упрощения реализации генератора код адаптера можно так упростить:

```typescript
import { Vector } from 'khusamov-base-types';

/**
 * Интерфейс объекта, который может поступательно перемещаться. */
export default class MovableAdapter implements IMovable {
        constructor(private universalObject: IUniversalObject) {}
        /**
         * Текущее время миллисекундах. */
        get time(): IMovable['time'] {
                return this.universalObject.getValue<IMovable['time']>('time');
        }
        set time(value: IMovable['time']) {
                return this.universalObject.setValue<IMovable['time']>('time', value);
        }
}
```

2) Надо придумать как реализовать значения по умолчанию. Дело в том, что значения 
   из `universalObject.getValue()` могут быть `undefined`.