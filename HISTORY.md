История разработки
==================

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

packages/khusamov-adapter-generator
Написана первая версия генератора адаптеров на основе [TypeScript Compiler API][compiler].

Задача генерации адаптера решена, но задача написания кодо-генератора в общем виде оказалось 
сложной из-за отсутствия документации на `Compiler API`. В итоге можно застрять в любой момент
при попытке расширить возможности генератора. В этом плане `Reflection` куда более привлекателен,
так как там все зависит от автора `typescript-rtti`, который пока активно разрабатывает свой проект.

[compiler]: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API