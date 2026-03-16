import { describe, expect, it, vi } from 'vitest'
import { getRepoRoot } from '../../src/git/get-repo-root'

vi.mock('../../src/git/git', () => ({
  git: vi.fn().mockReturnValue('/home/user/project'),
}))

describe('getRepoRoot', () => {
  it('calls git rev-parse --show-toplevel', async () => {
    const { git } = await import('../../src/git/git')
    const result = getRepoRoot()
    expect(result).toBe('/home/user/project')
    expect(git).toHaveBeenCalledWith(['rev-parse', '--show-toplevel'], undefined)
  })

  it('passes cwd', async () => {
    const { git } = await import('../../src/git/git')
    getRepoRoot('/other/dir')
    expect(git).toHaveBeenCalledWith(['rev-parse', '--show-toplevel'], '/other/dir')
  })
})
