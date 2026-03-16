import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git/git', () => ({
  git: vi.fn(),
}))

describe('addWorktree', () => {
  it('adds an existing branch worktree', async () => {
    const { git } = await import('../../src/git/git')
    const { addWorktree } = await import('../../src/git/add-worktree')
    const result = addWorktree('main', '/tmp/wt')
    expect(git).toHaveBeenCalledWith(['worktree', 'add', '/tmp/wt', 'main'], undefined)
    expect(result).toBe(path.resolve('.', '/tmp/wt'))
  })

  it('creates a new branch with -b flag', async () => {
    const { git } = await import('../../src/git/git')
    const { addWorktree } = await import('../../src/git/add-worktree')
    addWorktree('feature/new', '/tmp/wt-new', { newBranch: true })
    expect(git).toHaveBeenCalledWith(['worktree', 'add', '-b', 'feature/new', '/tmp/wt-new'], undefined)
  })

  it('passes cwd option', async () => {
    const { git } = await import('../../src/git/git')
    const { addWorktree } = await import('../../src/git/add-worktree')
    const result = addWorktree('main', 'wt', { cwd: '/repo' })
    expect(git).toHaveBeenCalledWith(['worktree', 'add', 'wt', 'main'], '/repo')
    expect(result).toBe(path.resolve('/repo', 'wt'))
  })
})
