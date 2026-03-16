import { describe, expect, it, vi } from 'vitest'
import { getRepoName } from '../../src/git/get-repo-name'

vi.mock('../../src/git/get-repo-root', () => ({
  getRepoRoot: vi.fn().mockReturnValue('/home/user/my-project'),
}))

describe('getRepoName', () => {
  it('returns the basename of the repo root', () => {
    expect(getRepoName()).toBe('my-project')
  })
})
