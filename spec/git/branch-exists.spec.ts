import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/git/git', () => ({
  git: vi.fn(),
}))

describe('branchExists', () => {
  it('returns true when git rev-parse succeeds', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockReturnValue('')
    const { branchExists } = await import('../../src/git/branch-exists')
    expect(branchExists('main')).toBe(true)
    expect(git).toHaveBeenCalledWith(['rev-parse', '--verify', 'main'], undefined)
  })

  it('returns false when git rev-parse throws', async () => {
    const { git } = await import('../../src/git/git')
    vi.mocked(git).mockImplementation(() => { throw new Error('not found') })
    const { branchExists } = await import('../../src/git/branch-exists')
    expect(branchExists('nonexistent')).toBe(false)
  })
})
