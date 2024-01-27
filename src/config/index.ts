import * as vscode from 'vscode';
import { DecoratorConfig } from './types';

const configPrefix = 'cssVarColorDecorator';

let decoratorConfig: DecoratorConfig = {
  supportedLanguages: []
};
loadConfig();

function loadConfig() {
  decoratorConfig = vscode.workspace.getConfiguration().get<DecoratorConfig>(configPrefix) || decoratorConfig;
}

export function onConfigurationChange(event: vscode.ConfigurationChangeEvent) {
  if (event.affectsConfiguration(configPrefix)) {
    loadConfig();
  }
}

export function getDecoratorConfig() {
  return decoratorConfig;
}
