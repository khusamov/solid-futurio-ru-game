Генератор адаптеров
===================

Идея данного генератора адаптера заключается в том, чтобы не быть зависимым 
от разработчиков библиотек с рефлексией для TypeScript. Данные библиотеки еще на стадии разработки
и нет стабильных версий. 

Более менее продуманная и поддерживаемая библиотека это `typescript-rtti`. Но у нее есть недостатки:
1. альфа-версия (есть не исправленные ошибки)
2. нет поддержки таких сборщиков как `parcel` и `esbuild` (потому что в них реализована 
   по-файловая компиляция TypeScript-кода)
3. в сборщик требуется встраивать ttypescript и трасформер, что влечет за собой неопределенные риски
   
Данный генератор адаптера создает файлы с классами адаптеров до компиляции и сборки проекта. 
На его вход требуется подать путь к интерфейсам и путь, куда сохранить готовые адаптеры.
В итоге, после создания нового интерфейса или изменении существующего следует заново запустить данный генератор.

У данного генератора есть преимущество: он не влияет на производительность программы, так как
генерация происходит не на лету во время исполнения программы, а до компиляции и сборки.
Также можно выполнять отладку адаптеров.

Текущее состояние проекта
-------------------------

По сути генератор готов. Он загружает файлы проекта, ищет в нем интерфейсы 
и по ним строит файлы с адаптерами с путями для сохранения.

Осталось сделать ввод данных (конфигурационный файл генератора) и сохранение результатов.

Пример генерации адаптера
-------------------------

Путь к файлу: `src/command/MoveCommand/MovableAdapter.ts`

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
        /**
         * Масса движущегося объекта. */
        get mass(): number {
                return this.universalObject.getValue<number>('mass');
        }
        set mass(value: number) {
                return this.universalObject.setValue<number>('mass', value);
        }
        /**
         * Координаты движущегося объекта. */
        get position(): Vector {
                return this.universalObject.getValue<Vector>('position');
        }
        set position(value: Vector) {
                return this.universalObject.setValue<Vector>('position', value);
        }
        /**
         * Приложенная сила. */
        get appliedForce(): Vector {
                return this.universalObject.getValue<Vector>('appliedForce');
        }
        set appliedForce(value: Vector) {
                return this.universalObject.setValue<Vector>('appliedForce', value);
        }
        /**
         * Линейное ускорение. */
        get linearAcceleration(): Vector {
                return this.universalObject.getValue<Vector>('linearAcceleration');
        }
        set linearAcceleration(value: Vector) {
                return this.universalObject.setValue<Vector>('linearAcceleration', value);
        }
        /**
         * Линейная скорость. */
        get linearVelocity(): Vector {
                return this.universalObject.getValue<Vector>('linearVelocity');
        }
        set linearVelocity(value: Vector) {
                return this.universalObject.setValue<Vector>('linearVelocity', value);
        }
}
```

Способы изучения TypeScript Compiler API
----------------------------------------

Изучение генерации AST-дерева при помощи:  
https://ast.carlosroso.com/  

Поиск функций в репозитории microsoft/TypeScript:  
https://github.com/microsoft/TypeScript/search?q=factory.createImportDeclaration&type=code  

Статьи:  
https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API  
https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/  
https://habr.com/ru/post/508484/  