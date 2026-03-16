import { describe, expect, it } from 'vitest'
import { EDITOR_COMMANDS } from '../../src/constants/editor-commands'

describe('EDITOR_COMMANDS', () => {
  it('contains all expected editor keys', () => {
    expect(Object.keys(EDITOR_COMMANDS)).toEqual(
      expect.arrayContaining(['cursor', 'code', 'zed', 'webstorm', 'idea', 'vim', 'nvim']),
    )
  })

  it('maps each key to its CLI command name', () => {
    for (const [key, value] of Object.entries(EDITOR_COMMANDS)) {
      expect(value).toBe(key)
    }
  })
})
