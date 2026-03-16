import { describe, expect, it } from 'vitest'
import * as constantsBarrel from '../../src/constants'

describe('constants barrel', () => {
  it('re-exports EDITOR_COMMANDS', () => {
    expect(constantsBarrel.EDITOR_COMMANDS).toBeDefined()
    expect(typeof constantsBarrel.EDITOR_COMMANDS).toBe('object')
  })
})
