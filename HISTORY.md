История разработки
==================

2022-04-23
----------

Автор `typescript-rtti` исправил ошибку: https://github.com/typescript-rtti/typescript-rtti/issues/56

Обновил `typescript-rtti` до `0.6.0` и ошибка действительно пропала. Сейчас тестовый пример отрабатывает все верно.

Также был сделан генератор адаптера `khusamov-adapter-generator`. Если с `typescript-rtti` опять не заладится,
то можно будет воспользоваться генератором. Но пока в этом нет острой необходимости.

2022-04-21
----------

Написана функция `getDeclarationFilename()` (спасибо за помощь https://vk.com/debagger), 
но проблема не решена.
Функция возвращает строку вида:

```
/Users/khusamov/Documents/repo/github.com/khusamov/solid-futurio-ru-game/packages/khusamov-base-types/dist/types/Vector.d.ts
```

Вопрос, как ее преобразовать в правильный импорт?

```typescript
import Vector from 'khusamov-base-types'
```

Выделить `khusamov-base-types` из пути не реально.


2022-04-20
----------

Написана первая версия генератора адаптеров на основе [TypeScript Compiler API][compiler]. 
См. пакет `packages/khusamov-adapter-generator`.

Задача генерации адаптера решена, но задача написания кодо-генератора в общем виде оказалось 
сложной из-за отсутствия документации на `Compiler API`. В итоге можно застрять в любой момент
при попытке расширить возможности генератора. В этом плане `Reflection` куда более привлекателен,
так как там все зависит от автора `typescript-rtti`, который пока активно разрабатывает свой проект.

[compiler]: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API