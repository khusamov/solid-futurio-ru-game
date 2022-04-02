import {RollupHtmlTemplateOptions} from '@rollup/plugin-html';

/**
 * Шаблон HTML-файла.
 * @link https://github.com/rollup/plugins/tree/master/packages/html#template
 * @link https://github.com/rollup/plugins/blob/master/packages/html/lib/index.js#L27
 */
export default function htmlTemplate(options?: RollupHtmlTemplateOptions): string {
	if (!options) throw new Error('Ожидаются опции')
	const {attributes, files, publicPath, title} = options

	const scripts = (
		(files.js || [])
			.map(({ fileName }) => {
				const attrs = makeHtmlAttributes(attributes.script);
				return `<script src="${publicPath}${fileName}" ${attrs}></script>`;
			})
			.join('\n')
	);

	const links = (
		(files.css || [])
			.map(({ fileName }) => {
				const attrs = makeHtmlAttributes(attributes.link);
				return `<link href="${publicPath}${fileName}" rel="stylesheet" ${attrs}>`;
			})
			.join('\n')
	);

	// Ссылки вида unpkg.com/prettier@2.2.1 берутся со следующих страниц:
	// https://prettier.io/docs/en/browser.html#prettierformatcode-options
	// https://unpkg.com/browse/prettier@2.2.1/

	return (`
		<!doctype html>
		<html${makeHtmlAttributes(attributes.html)}>
			<head>
				<meta charset="utf-8">
				<title>${title}</title>
				<script>
					window.addEventListener('unhandledrejection', promiseRejectionEvent => {
						console.error(promiseRejectionEvent);
					});
				</script>
				<script src="https://unpkg.com/prettier@2.2.1/parser-typescript.js"></script>
				${links}
			</head>
			<body>
				<div id='root'></div>
				${scripts}
			</body>
		</html>
	`);
}

function makeHtmlAttributes(attributes: any) {
	if (!attributes) {
		return '';
	}

	const keys = Object.keys(attributes);
	// eslint-disable-next-line no-param-reassign
	return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
}