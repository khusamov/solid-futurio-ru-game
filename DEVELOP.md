Инструкции для разработчика
===========================

Внимание! Надо рассмотреть замены инструментария:
Lerna -> Rush https://rushjs.io/
Rollup -> ESBuild https://esbuild.github.io/

По поводу ESBuild:
https://uproger.com/sozdajte-prilozhenie-react-js-s-pomoshhyu-esbuild-i-node/

Внимание! Lerna имеет проблемы:
1. Не работает bootstrap из-за несовместимости с последней версией Yarn.
2. Не работает запуск `lerna run --scope`.
По этой причине изучаем `yarn workspaces`.


Известные баги
--------------

### Reflect.hasMetadata is not a function

Ошибка вида
`Uncaught TypeError: Reflect.hasMetadata is not a function`
говорит о том, что в точке входа в приложение забыли прописать:
`import 'reflect-metadata'`.


Перед разработкой
-----------------

Перед началом разработки следует подготовить все пакеты.

Для начала нужно установить все зависимости и связать пакеты при помощи lerna.

```
yarn
yarn plugin import workspace-tools
``` 

Далее следует собрать все пакеты в порядке их зависимости:

```
yarn rollup-config:build
```

После этого можно запускать демонстрационную программу:

```
yarn start
```

Публикация пакетов
------------------

```
lerna publish
```