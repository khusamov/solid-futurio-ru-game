khusamov-rollup-config
=======================

Генераторы файла `rollup.config.js` для всех пакетов:

1. getLibraryRollupConfig() - Генератор конфигурационного файла для создания библиотек.
2. getApplicationRollupConfig() - Генератор конфигурационного файла для создания приложений.

Пример использования 
--------------------

Файл `rollup.config.js`:

```typescript
import {getLibraryRollupConfig} from 'khusamov-rollup-config';
import npmPackageJsonFile from './package.json';
export default getLibraryRollupConfig({npmPackageJsonFile, outDir: 'dist'});
```