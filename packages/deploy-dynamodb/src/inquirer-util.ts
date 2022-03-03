// @ts-ignore
import inquirer from 'inquirer';

export const DynamoActionsConfiguration = [
  'write',
  'get'
] as const;

export const TypesOfWrite = [
  'new-coin',
  'time-stamp'
] as const;

export type IDynamoActionsConfiguration = typeof DynamoActionsConfiguration[number];

export type ICreateCommand = {
  actions?: unknown;
  message: string
  type: 'list' | 'input'
  name?: string
}

export async function createCommands({ actions, message, type, name }: ICreateCommand) {
  const {
    command: selectCommand
  } = await inquirer.prompt<{
    command: string
  }>([
    {
      type,
      name: typeof name === 'undefined'  ? 'command' : name,
      message,
      choices: actions
    }
  ]);

  return selectCommand;
}
