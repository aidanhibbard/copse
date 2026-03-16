import type { EditorName } from '../types'
import { EDITOR_COMMANDS } from '../constants'

export function resolveEditorCommand(editor: EditorName): string {
  return EDITOR_COMMANDS[editor] ?? editor
}
