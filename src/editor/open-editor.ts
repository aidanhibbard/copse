import type { EditorName } from '../types'
import { spawn } from 'node:child_process'
import { resolveEditorCommand } from './resolve-editor-command'

export function openEditor(directory: string, editor: EditorName = 'cursor'): void {
  const command = resolveEditorCommand(editor)

  const child = spawn(command, [directory], {
    detached: true,
    stdio: 'ignore',
  })

  child.unref()
}
