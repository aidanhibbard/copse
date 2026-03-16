import { describe, expect, it } from 'vitest'
import { resolveEditorCommand } from '../../src/editor/resolve-editor-command'

describe('resolveEditorCommand', () => {
  it('returns the command for known editors', () => {
    expect(resolveEditorCommand('cursor')).toBe('cursor')
    expect(resolveEditorCommand('code')).toBe('code')
    expect(resolveEditorCommand('zed')).toBe('zed')
    expect(resolveEditorCommand('webstorm')).toBe('webstorm')
    expect(resolveEditorCommand('idea')).toBe('idea')
    expect(resolveEditorCommand('vim')).toBe('vim')
    expect(resolveEditorCommand('nvim')).toBe('nvim')
  })

  it('passes through unknown editor names', () => {
    expect(resolveEditorCommand('my-custom-editor')).toBe('my-custom-editor')
  })
})
