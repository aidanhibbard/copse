import path from 'node:path'
import { git } from './git'

export function addWorktree(branchOrPath: string, targetPath: string, opts?: { newBranch?: boolean, cwd?: string }): string {
  const args = ['worktree', 'add']

  if (opts?.newBranch) {
    args.push('-b', branchOrPath, targetPath)
  }
  else {
    args.push(targetPath, branchOrPath)
  }

  git(args, opts?.cwd)
  return path.resolve(opts?.cwd ?? '.', targetPath)
}
