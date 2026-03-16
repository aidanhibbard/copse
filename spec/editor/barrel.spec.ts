import { describe, expect, it } from 'vitest'
import * as editorBarrel from '../../src/editor'

describe('editor barrel', () => {
  it('re-exports all editor functions', () => {
    expect(editorBarrel.openEditor).toBeTypeOf('function')
    expect(editorBarrel.resolveEditorCommand).toBeTypeOf('function')
  })
})
