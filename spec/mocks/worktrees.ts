import type { WorktreeInfo } from '../../src/types'

export const PORCELAIN_MAIN = `worktree /home/user/project
HEAD abc1234567890
branch refs/heads/main`

export const PORCELAIN_FEATURE = `worktree /home/user/project-feature-auth
HEAD def4567890123
branch refs/heads/feature/auth`

export const PORCELAIN_DETACHED = `worktree /home/user/project-detached
HEAD 111222333444
detached`

export const PORCELAIN_BARE = `worktree /home/user/project.git
HEAD 000000000000
bare`

export const PORCELAIN_MULTI = [PORCELAIN_MAIN, PORCELAIN_FEATURE].join('\n\n')

export const PORCELAIN_ALL = [PORCELAIN_MAIN, PORCELAIN_FEATURE, PORCELAIN_DETACHED, PORCELAIN_BARE].join('\n\n')

export const WORKTREE_MAIN: WorktreeInfo = {
  path: '/home/user/project',
  head: 'abc1234567890',
  branch: 'main',
  bare: false,
  detached: false,
  main: true,
}

export const WORKTREE_FEATURE: WorktreeInfo = {
  path: '/home/user/project-feature-auth',
  head: 'def4567890123',
  branch: 'feature/auth',
  bare: false,
  detached: false,
  main: false,
}

export const WORKTREE_DETACHED: WorktreeInfo = {
  path: '/home/user/project-detached',
  head: '111222333444',
  branch: null,
  bare: false,
  detached: true,
  main: false,
}

export const WORKTREE_BARE: WorktreeInfo = {
  path: '/home/user/project.git',
  head: '000000000000',
  branch: null,
  bare: true,
  detached: false,
  main: false,
}
