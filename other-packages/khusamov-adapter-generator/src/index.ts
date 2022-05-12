import {resolve} from 'path'
import {writeFile} from 'fs/promises'
import {readdir, stat} from 'fs/promises'
import {program as commanderProgram} from 'commander'
import generateProjectAdapters from './functions/generateProjectAdapters';

if (require.main === module) {
	generate()
}

export async function generate() {
	interface IOptions{
		directoryOfProjects: string
	}
	commanderProgram.option('--directory-of-projects <char>', 'Директория, где каждая папка есть TS-проект', 'packages')
	commanderProgram.parse()
	const options = commanderProgram.opts<IOptions>()

	const isDirectory = async (item: string) => (await stat(resolve(options.directoryOfProjects, item))).isDirectory()
	const projectDirectories = (
		(await Promise.all(
			(await readdir(resolve(options.directoryOfProjects)))
				.map(async (item) => (await isDirectory(item)) ? item : null)
		))
			.filter((item): item is string => item !== null)
	)

	for (const projectDirectory of projectDirectories) {
		console.log('- - - - - - - - - - - - - - - - - - - - - - - - - -')
		console.log('Генерация адаптеров для проекта:', projectDirectory)
		const generateResult = generateProjectAdapters(resolve(options.directoryOfProjects, projectDirectory))
		for (const info of generateResult) {
			// TODO Сделать сохранение файлов адаптеров.
			//console.log('info.sourceFile.getText()',info.sourceFile.getText())
		}
	}
}