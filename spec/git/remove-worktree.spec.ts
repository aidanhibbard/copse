import { describe, expect, it, vi } from 'vitest'
import { WORKTREE_FEATURE, WORKTREE_MAIN } from '../mocks/worktrees'

vi.mock('../../src/git/git', () => ({
  git: vi.fn(),
}))

vi.mock('../../src/git/list-worktrees', () => ({
  listWorktrees: vi.fn().mockReturnValue([WORKTREE_MAIN, WORKTREE_FEATURE]),
}))

describe('removeWorktree', () => {
  it('removes by branch name, resolving to path', async () => {
    const { git } = await import('../../src/git/git')
    const { removeWorktree } = await import('../../src/git/remove-worktree')
    removeWorktree('feature/auth')
    expect(git).toHaveBeenCalledWith(['worktree', 'remove', WORKTREE_FEATURE.path], undefined)
  })

  it('removes by path directly', async () => {
    const { git } = await import('../../src/git/git')
    const { removeWorktree } = await import('../../src/git/remove-worktree')
    removeWorktree(WORKTREE_MAIN.path)
    expect(git).toHaveBeenCalledWith(['worktree', 'remove', WORKTREE_MAIN.path], undefined)
  })

  it('passes --force flag', async () => {
    const { git } = await import('../../src/git/git')
    const { removeWorktree } = await import('../../src/git/remove-worktree')
    removeWorktree('feature/auth', { force: true })
    expect(git).toHaveBeenCalledWith(['worktree', 'remove', '--force', WORKTREE_FEATURE.path], undefined)
  })

  it('falls back to raw path when no match found', async () => {
    const { git } = await import('../../src/git/git')
    const { removeWorktree } = await import('../../src/git/remove-worktree')
    removeWorktree('/nonexistent/path')
    expect(git).toHaveBeenCalledWith(['worktree', 'remove', '/nonexistent/path'], undefined)
  })
})
