// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { listener, disposeDecoratorStore, updateDecoratorStore } from './listener';
import { hexToHsl } from './lib';
import { toHslCommand } from './command';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	updateDecoratorStore(context, []);

	const contextListener = listener(context);

	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor) {
		contextListener(activeEditor.document);
	}

	vscode.workspace.onDidChangeTextDocument(event => {
		contextListener(event.document);
	}, null, context.subscriptions);

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			contextListener(editor.document);
		}
	}, null, context.subscriptions);

	const toHslDisposable = vscode.commands.registerCommand('color.hex2Hsl', () => {
		const editor = vscode.window.activeTextEditor;
		toHslCommand(editor);
	});

	context.subscriptions.push(toHslDisposable);
}

// This method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext) {
	disposeDecoratorStore(context);
}
