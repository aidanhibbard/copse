import { describe, expect, it } from 'vitest'
import * as gitBarrel from '../../src/git'

describe('git barrel', () => {
  it('re-exports all git functions', () => {
    expect(gitBarrel.addWorktree).toBeTypeOf('function')
    expect(gitBarrel.branchExists).toBeTypeOf('function')
    expect(gitBarrel.findWorktreeByBranch).toBeTypeOf('function')
    expect(gitBarrel.getRepoName).toBeTypeOf('function')
    expect(gitBarrel.getRepoRoot).toBeTypeOf('function')
    expect(gitBarrel.listWorktrees).toBeTypeOf('function')
    expect(gitBarrel.pruneWorktrees).toBeTypeOf('function')
    expect(gitBarrel.removeWorktree).toBeTypeOf('function')
    expect(gitBarrel.resolveWorktreePath).toBeTypeOf('function')
    expect(gitBarrel.sanitizeBranch).toBeTypeOf('function')
  })
})
