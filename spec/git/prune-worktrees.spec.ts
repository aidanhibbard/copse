import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git/git', () => ({
  git: vi.fn(),
}))

describe('pruneWorktrees', () => {
  it('calls git worktree prune', async () => {
    const { git } = await import('../../src/git/git')
    const { pruneWorktrees } = await import('../../src/git/prune-worktrees')
    pruneWorktrees()
    expect(git).toHaveBeenCalledWith(['worktree', 'prune'], undefined)
  })

  it('passes cwd', async () => {
    const { git } = await import('../../src/git/git')
    const { pruneWorktrees } = await import('../../src/git/prune-worktrees')
    pruneWorktrees('/some/dir')
    expect(git).toHaveBeenCalledWith(['worktree', 'prune'], '/some/dir')
  })
})
