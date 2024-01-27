import vscode, { TextDocument } from 'vscode';
import { isPresent } from '../lib';
import { createColorDecorator, disposeDecoratorStore, lineToPreview, updateDecoratorStore } from './utils';
import { getDecoratorConfig } from '../config';
export { disposeDecoratorStore, updateDecoratorStore };

export function listener(context: vscode.ExtensionContext) {
  return (document: TextDocument) => {
    const { languageId } = document;
    const {supportedLanguages} = getDecoratorConfig(); 
    const isListening = supportedLanguages.includes(languageId);
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
