import process from 'node:process'
import { runCommand } from 'citty'
import { describe, expect, it, vi } from 'vitest'
import { WORKTREE_FEATURE, WORKTREE_MAIN } from '../mocks/worktrees'

vi.mock('../../src/git', () => ({
  findWorktreeByBranch: vi.fn(),
  listWorktrees: vi.fn().mockReturnValue([WORKTREE_MAIN, WORKTREE_FEATURE]),
}))

vi.mock('../../src/editor', () => ({
  openEditor: vi.fn(),
}))

vi.mock('../../src/utils/logger', () => ({
  logger: { info: vi.fn(), success: vi.fn(), log: vi.fn(), error: vi.fn() },
}))

describe('open command', () => {
  it('opens the worktree in the editor when found', async () => {
    const { findWorktreeByBranch } = await import('../../src/git')
    vi.mocked(findWorktreeByBranch).mockReturnValue(WORKTREE_FEATURE)
    const { openEditor } = await import('../../src/editor')

    const { default: cmd } = await import('../../src/commands/open')
    await runCommand(cmd, { rawArgs: ['feature/auth'] })

    expect(openEditor).toHaveBeenCalledWith(WORKTREE_FEATURE.path, 'cursor')
  })

  it('exits with error and shows available branches', async () => {
    const { findWorktreeByBranch } = await import('../../src/git')
    vi.mocked(findWorktreeByBranch).mockReturnValue(undefined)
    const { logger } = await import('../../src/utils/logger')
    vi.mocked(logger.error).mockClear()
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit')
    })

    const { default: cmd } = await import('../../src/commands/open')
    await expect(runCommand(cmd, { rawArgs: ['nonexistent'] })).rejects.toThrow('process.exit')

    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('nonexistent'))
    expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Available branches'))
    expect(exitSpy).toHaveBeenCalledWith(1)
    exitSpy.mockRestore()
  })

  it('exits with error without available branches when none exist', async () => {
    const { findWorktreeByBranch, listWorktrees } = await import('../../src/git')
    vi.mocked(findWorktreeByBranch).mockReturnValue(undefined)
    vi.mocked(listWorktrees).mockReturnValue([])
    const { logger } = await import('../../src/utils/logger')
    vi.mocked(logger.error).mockClear()
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit')
    })

    const { default: cmd } = await import('../../src/commands/open')
    await expect(runCommand(cmd, { rawArgs: ['nonexistent'] })).rejects.toThrow('process.exit')

    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(exitSpy).toHaveBeenCalledWith(1)
    exitSpy.mockRestore()
  })
})
