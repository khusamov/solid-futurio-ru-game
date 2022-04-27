import {ICommand} from 'khusamov-base-types';

/**
 * Функция для вывода имени команды в единообразном виде.
 *
 * Это требуется в ситуации: есть имя commandName и найденная по этому имени
 * команда command. Если команда не найдена, то command === undefined.
 * И требуется для отладки вывести имя команды.
 *
 * @param commandName Искомое имя команды.
 * @param command Ссылка на команду, которая может быть не найдена.
 */
export default function commandFullName(commandName: string, command?: ICommand) {
	const commandCommonName = (
		command
			? command.name
			: 'Command not found'
	)

	return `${commandName}(${commandCommonName})`
}