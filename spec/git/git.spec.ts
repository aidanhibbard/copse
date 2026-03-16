import { execFileSync } from 'node:child_process'
import { describe, expect, it, vi } from 'vitest'
import { git } from '../../src/git/git'

vi.mock('node:child_process', () => ({
  execFileSync: vi.fn(),
}))

const mockExecFileSync = vi.mocked(execFileSync)

describe('git', () => {
  it('forwards args to execFileSync and trims output', () => {
    mockExecFileSync.mockReturnValue('  hello world  \n')
    const result = git(['status'])
    expect(result).toBe('hello world')
    expect(mockExecFileSync).toHaveBeenCalledWith('git', ['status'], {
      cwd: undefined,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
  })

  it('passes cwd when provided', () => {
    mockExecFileSync.mockReturnValue('ok')
    git(['log'], '/some/dir')
    expect(mockExecFileSync).toHaveBeenCalledWith('git', ['log'], expect.objectContaining({
      cwd: '/some/dir',
    }))
  })
})
