import { spawn } from 'node:child_process'
import { describe, expect, it, vi } from 'vitest'
import { openEditor } from '../../src/editor/open-editor'

vi.mock('node:child_process', () => ({
  spawn: vi.fn().mockReturnValue({ unref: vi.fn() }),
}))

const mockSpawn = vi.mocked(spawn)

describe('openEditor', () => {
  it('spawns the editor detached with stdio ignored', () => {
    openEditor('/some/dir', 'code')
    expect(mockSpawn).toHaveBeenCalledWith('code', ['/some/dir'], {
      detached: true,
      stdio: 'ignore',
    })
    const child = mockSpawn.mock.results[0]?.value as { unref: ReturnType<typeof vi.fn> }
    expect(child.unref).toHaveBeenCalled()
  })

  it('defaults to cursor editor', () => {
    openEditor('/some/dir')
    expect(mockSpawn).toHaveBeenCalledWith('cursor', ['/some/dir'], expect.objectContaining({
      detached: true,
    }))
  })
})
