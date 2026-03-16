import { git } from './git'
import { listWorktrees } from './list-worktrees'

export function removeWorktree(pathOrBranch: string, opts?: { force?: boolean, cwd?: string }): void {
  const worktrees = listWorktrees(opts?.cwd)
  const match = worktrees.find(wt => wt.path === pathOrBranch || wt.branch === pathOrBranch)
  const target = match?.path ?? pathOrBranch

  const args = ['worktree', 'remove']
  if (opts?.force)
    args.push('--force')
  args.push(target)

  git(args, opts?.cwd)
}
