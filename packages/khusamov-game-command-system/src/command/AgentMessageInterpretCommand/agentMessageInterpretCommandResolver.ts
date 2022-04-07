import {ICommand} from 'khusamov-base-types';
import {RepeatableCommand} from 'khusamov-command-system';
import AgentMessageInterpretCommand from './AgentMessageInterpretCommand';

export default function agentMessageInterpretCommandResolver(): ICommand {
	return new RepeatableCommand(new AgentMessageInterpretCommand)
}