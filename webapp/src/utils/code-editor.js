import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export function createMonacoEditor ({ entryEl, fontSize = 14, language, code }) {
  const monacoInstance = monaco.editor.create(
    entryEl,
    {
      value: code,
      language,
      theme: 'vs-light',
      minimap: { enabled: false },
      fontSize,
    }
  );

  
  return monacoInstance;
  // const monacoModel = monacoInstance.getModel();
  // monacoModel.onDidChangeContent(this.handleMonacoContentChange);
}