import { describe, expect, it, vi } from 'vitest'
import { WORKTREE_FEATURE, WORKTREE_MAIN } from '../mocks/worktrees'

vi.mock('../../src/git/list-worktrees', () => ({
  listWorktrees: vi.fn().mockReturnValue([WORKTREE_MAIN, WORKTREE_FEATURE]),
}))

describe('findWorktreeByBranch', () => {
  it('returns the matching worktree', async () => {
    const { findWorktreeByBranch } = await import('../../src/git/find-worktree-by-branch')
    expect(findWorktreeByBranch('feature/auth')).toEqual(WORKTREE_FEATURE)
  })

  it('returns undefined when no match', async () => {
    const { findWorktreeByBranch } = await import('../../src/git/find-worktree-by-branch')
    expect(findWorktreeByBranch('nonexistent')).toBeUndefined()
  })
})
