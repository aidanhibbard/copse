import { describe, expect, it, vi } from 'vitest'
import { runCommand } from 'citty'
import { WORKTREE_BARE, WORKTREE_DETACHED, WORKTREE_FEATURE, WORKTREE_MAIN } from '../mocks/worktrees'

vi.mock('../../src/git', () => ({
  listWorktrees: vi.fn().mockReturnValue([]),
}))

vi.mock('../../src/utils/logger', () => ({
  logger: { info: vi.fn(), success: vi.fn(), log: vi.fn(), error: vi.fn() },
}))

describe('list command', () => {
  it('logs message when no worktrees exist', async () => {
    const { default: cmd } = await import('../../src/commands/list')
    const { logger } = await import('../../src/utils/logger')

    await runCommand(cmd, { rawArgs: [] })

    expect(logger.info).toHaveBeenCalledWith('No worktrees found.')
  })

  it('prints worktree info with main label', async () => {
    const { listWorktrees } = await import('../../src/git')
    vi.mocked(listWorktrees).mockReturnValue([WORKTREE_MAIN, WORKTREE_FEATURE])

    const { default: cmd } = await import('../../src/commands/list')
    const { logger } = await import('../../src/utils/logger')
    vi.mocked(logger.log).mockClear()

    await runCommand(cmd, { rawArgs: [] })

    expect(logger.log).toHaveBeenCalledTimes(2)
    const firstCall = vi.mocked(logger.log).mock.calls[0]?.[0] as string
    expect(firstCall).toContain('main')
    expect(firstCall).toContain('[main]')
  })

  it('prints detached label for detached worktrees', async () => {
    const { listWorktrees } = await import('../../src/git')
    vi.mocked(listWorktrees).mockReturnValue([WORKTREE_DETACHED])

    const { default: cmd } = await import('../../src/commands/list')
    const { logger } = await import('../../src/utils/logger')
    vi.mocked(logger.log).mockClear()

    await runCommand(cmd, { rawArgs: [] })

    const call = vi.mocked(logger.log).mock.calls[0]?.[0] as string
    expect(call).toContain('(detached)')
  })

  it('prints bare label for bare worktrees', async () => {
    const { listWorktrees } = await import('../../src/git')
    vi.mocked(listWorktrees).mockReturnValue([WORKTREE_BARE])

    const { default: cmd } = await import('../../src/commands/list')
    const { logger } = await import('../../src/utils/logger')
    vi.mocked(logger.log).mockClear()

    await runCommand(cmd, { rawArgs: [] })

    const call = vi.mocked(logger.log).mock.calls[0]?.[0] as string
    expect(call).toContain('(bare)')
  })
})
