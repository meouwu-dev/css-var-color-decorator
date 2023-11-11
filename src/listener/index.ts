import vscode, { TextDocument } from 'vscode';
import { isPresent } from '../lib';
import { createColorDecorator, disposeDecoratorStore, lineToPreview, updateDecoratorStore } from './utils';
export { disposeDecoratorStore, updateDecoratorStore };

const supportLanguageType = ["css", "scss", "tailwindcss"];

export function listener(context: vscode.ExtensionContext) {
  return (document: TextDocument) => {
    const { languageId } = document;
    const isListening = supportLanguageType.includes(languageId);
    if (!isListening) {
      return;
    }
    disposeDecoratorStore(context);

    const lines = document.getText()
      .split("\n")
      .map((text, index) => lineToPreview({
        text, lineIndex: index
      }))
      .filter(isPresent);

    const decorators = lines
      .map((it) => createColorDecorator(it, languageId))
      .filter(isPresent);
    updateDecoratorStore(context, decorators);
  };
}
