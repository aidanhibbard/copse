import { describe, expect, it } from 'vitest'
import * as commandsBarrel from '../../src/commands'

describe('commands barrel', () => {
  it('re-exports all commands', () => {
    expect(commandsBarrel.add).toBeDefined()
    expect(commandsBarrel.list).toBeDefined()
    expect(commandsBarrel.open).toBeDefined()
    expect(commandsBarrel.remove).toBeDefined()
  })
})
