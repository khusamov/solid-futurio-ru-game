Инструкции для разработчика
===========================

Известные баги
--------------

### Reflect.hasMetadata is not a function

Ошибка вида
`Uncaught TypeError: Reflect.hasMetadata is not a function`
говорит о том, что в точке входа в приложение забыли прописать:
`import 'reflect-metadata'`.