import vscode from 'vscode';
import { hexToHsl } from '../lib';

export function toHslCommand(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    return;
  }
  const {document, selection} = editor;

  const wordRange = document.getWordRangeAtPosition(selection.active);
  if (!wordRange) {
    return;
  }

  // if the char before the selection is a #, include it in the range
  const charBeforeRange = new vscode.Range(wordRange.start.translate(0, -1), wordRange.end);
  const charBefore = document.getText(charBeforeRange);

  const replaceRange = charBefore === "#" ? charBeforeRange : wordRange;

  const text = editor.document.getText(replaceRange);
  const hsl = hexToHsl(text);
  if (!hsl) {
    return;
  }
  // replace the selected text with the hsl
  editor.edit(editBuilder => {
    editBuilder.replace(replaceRange, hsl);
  });
}