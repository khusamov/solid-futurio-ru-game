import {Plugin} from 'prettier';

/**
 * Для браузера подключение Prettier довольно печальное.
 * Приходится в HTML напрямую включать ссылку для загрузки кода плагинов.
 * Причем эти плагины прописываются в глобальной переменной prettierPlugins.
 * Приходится это описывать, чтобы ошибки от компилятора не мозолили глаза.
 * @link https://prettier.io/docs/en/browser.html
 * Данный пример подсмотрен в этом абзаце:
 * @link https://prettier.io/docs/en/browser.html#worker
 */
export default interface IPrettierPlugins {
	prettierPlugins: Array<string | Plugin>
}