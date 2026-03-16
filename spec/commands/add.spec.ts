import { runCommand } from 'citty'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git', () => ({
  branchExists: vi.fn().mockReturnValue(false),
  resolveWorktreePath: vi.fn().mockReturnValue('/tmp/repo-feature-x'),
  addWorktree: vi.fn().mockReturnValue('/tmp/repo-feature-x'),
}))

vi.mock('../../src/editor', () => ({
  openEditor: vi.fn(),
}))

vi.mock('../../src/utils/logger', () => ({
  logger: { info: vi.fn(), success: vi.fn(), log: vi.fn(), error: vi.fn() },
}))

describe('add command', () => {
  it('creates a new branch worktree and opens editor', async () => {
    const { default: cmd } = await import('../../src/commands/add')
    const { addWorktree, branchExists } = await import('../../src/git')
    const { openEditor } = await import('../../src/editor')
    const { logger } = await import('../../src/utils/logger')

    await runCommand(cmd, { rawArgs: ['feature/x'] })

    expect(branchExists).toHaveBeenCalledWith('feature/x')
    expect(addWorktree).toHaveBeenCalledWith('feature/x', '/tmp/repo-feature-x', { newBranch: true })
    expect(logger.success).toHaveBeenCalled()
    expect(openEditor).toHaveBeenCalledWith('/tmp/repo-feature-x', 'cursor')
  })

  it('uses existing branch when it exists', async () => {
    const { default: cmd } = await import('../../src/commands/add')
    const { addWorktree, branchExists } = await import('../../src/git')
    vi.mocked(branchExists).mockReturnValue(true)

    await runCommand(cmd, { rawArgs: ['main'] })

    expect(addWorktree).toHaveBeenCalledWith('main', '/tmp/repo-feature-x', { newBranch: false })
  })

  it('skips editor when --no-open is passed', async () => {
    const { default: cmd } = await import('../../src/commands/add')
    const { openEditor } = await import('../../src/editor')
    vi.mocked(openEditor).mockClear()

    await runCommand(cmd, { rawArgs: ['feature/y', '--no-open'] })

    expect(openEditor).not.toHaveBeenCalled()
  })
})
