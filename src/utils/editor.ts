import { spawn } from 'node:child_process'

export type EditorName = 'cursor' | 'code' | 'zed' | 'webstorm' | 'idea' | 'vim' | 'nvim' | (string & {})

const EDITOR_COMMANDS: Record<string, string> = {
  cursor: 'cursor',
  code: 'code',
  zed: 'zed',
  webstorm: 'webstorm',
  idea: 'idea',
  vim: 'vim',
  nvim: 'nvim',
}

export function resolveEditorCommand(editor: EditorName): string {
  return EDITOR_COMMANDS[editor] ?? editor
}

export function openEditor(directory: string, editor: EditorName = 'cursor'): void {
  const command = resolveEditorCommand(editor)

  const child = spawn(command, [directory], {
    detached: true,
    stdio: 'ignore',
  })

  child.unref()
}
