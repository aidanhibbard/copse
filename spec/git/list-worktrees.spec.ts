import { describe, expect, it, vi } from 'vitest'
import { PORCELAIN_ALL, WORKTREE_BARE, WORKTREE_DETACHED, WORKTREE_FEATURE, WORKTREE_MAIN } from '../mocks/worktrees'

vi.mock('../../src/git/git', () => ({
  git: vi.fn(),
}))

describe('listWorktrees', () => {
  it('returns empty array when git returns empty string', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockReturnValue('')
    const { listWorktrees } = await import('../../src/git/list-worktrees')
    expect(listWorktrees()).toEqual([])
  })

  it('parses porcelain output into WorktreeInfo array', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockReturnValue(PORCELAIN_ALL)
    const { listWorktrees } = await import('../../src/git/list-worktrees')
    const result = listWorktrees()
    expect(result).toEqual([WORKTREE_MAIN, WORKTREE_FEATURE, WORKTREE_DETACHED, WORKTREE_BARE])
  })

  it('passes cwd to git', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockReturnValue('')
    const { listWorktrees } = await import('../../src/git/list-worktrees')
    listWorktrees('/some/cwd')
    expect(git).toHaveBeenCalledWith(['worktree', 'list', '--porcelain'], '/some/cwd')
  })

  it('defaults to empty strings when worktree/HEAD lines are missing', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockReturnValue('bare')
    const { listWorktrees } = await import('../../src/git/list-worktrees')
    const result = listWorktrees()
    expect(result).toEqual([{
      path: '',
      head: '',
      branch: null,
      bare: true,
      detached: false,
      main: true,
    }])
  })
})
