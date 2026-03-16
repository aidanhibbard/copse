import { runCommand } from 'citty'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git', () => ({
  removeWorktree: vi.fn(),
}))

vi.mock('../../src/utils/logger', () => ({
  logger: { info: vi.fn(), success: vi.fn(), log: vi.fn(), error: vi.fn() },
}))

describe('remove command', () => {
  it('removes a worktree by branch name', async () => {
    const { removeWorktree } = await import('../../src/git')
    const { default: cmd } = await import('../../src/commands/remove')
    const { logger } = await import('../../src/utils/logger')

    await runCommand(cmd, { rawArgs: ['feature/auth'] })

    expect(removeWorktree).toHaveBeenCalledWith('feature/auth', { force: false })
    expect(logger.success).toHaveBeenCalledWith('Worktree removed.')
  })

  it('passes force flag', async () => {
    const { removeWorktree } = await import('../../src/git')
    const { default: cmd } = await import('../../src/commands/remove')

    await runCommand(cmd, { rawArgs: ['feature/auth', '--force'] })

    expect(removeWorktree).toHaveBeenCalledWith('feature/auth', { force: true })
  })
})
