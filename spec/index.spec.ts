import { describe, expect, it, vi } from 'vitest'

let capturedDef: Record<string, unknown> = {}

vi.mock('citty', () => ({
  defineCommand: vi.fn().mockImplementation((def: Record<string, unknown>) => {
    capturedDef = def
    return def
  }),
  runMain: vi.fn(),
}))

describe('main CLI entry', () => {
  it('defines the main command with correct meta and subcommands', async () => {
    const { defineCommand, runMain } = await import('citty')

    await import('../src/index')

    expect(defineCommand).toHaveBeenCalledWith(expect.objectContaining({
      meta: expect.objectContaining({
        name: 'copse',
        version: '0.0.1',
      }),
    }))
    expect(runMain).toHaveBeenCalled()
  })

  it('lazy loads all subcommands', async () => {
    const subCommands = capturedDef.subCommands as Record<string, () => Promise<unknown>>
    expect(subCommands).toBeDefined()

    const keys = Object.keys(subCommands)
    expect(keys).toEqual(expect.arrayContaining(['add', 'list', 'remove', 'open']))

    for (const key of keys) {
      const loader = subCommands[key]
      expect(loader).toBeTypeOf('function')
      const mod = await loader!()
      expect(mod).toBeDefined()
    }
  })
})
