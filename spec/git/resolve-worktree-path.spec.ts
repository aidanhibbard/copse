import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git/get-repo-root', () => ({
  getRepoRoot: vi.fn().mockReturnValue('/home/user/my-project'),
}))

describe('resolveWorktreePath', () => {
  it('returns resolved custom path when provided', async () => {
    const { resolveWorktreePath } = await import('../../src/git/resolve-worktree-path')
    expect(resolveWorktreePath('feature/x', './custom')).toBe(path.resolve('./custom'))
  })

  it('creates sibling directory path with sanitized branch name', async () => {
    const { resolveWorktreePath } = await import('../../src/git/resolve-worktree-path')
    expect(resolveWorktreePath('feature/auth')).toBe('/home/user/my-project-feature-auth')
  })

  it('handles branch with no slashes', async () => {
    const { resolveWorktreePath } = await import('../../src/git/resolve-worktree-path')
    expect(resolveWorktreePath('main')).toBe('/home/user/my-project-main')
  })
})
