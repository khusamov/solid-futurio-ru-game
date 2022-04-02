Форматирование кода TypeScript/JavaScript
=========================================

Функция `formatCode()` форматирует текст TypeScript-кода с предустановленными настройками. 
Конечно же подходит и для JavaScript-кода.

Пример использования:
---------------------

```typescript
import formatCode from '../formatCode';

console.log(formatCode(`
    class Hello {
        print() {
            console.log('Hello World!')
        }
    }
`))
```