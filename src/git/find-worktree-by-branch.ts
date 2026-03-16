import type { WorktreeInfo } from '../types'
import { listWorktrees } from './list-worktrees'

export function findWorktreeByBranch(branch: string, cwd?: string): WorktreeInfo | undefined {
  return listWorktrees(cwd).find(wt => wt.branch === branch)
}
