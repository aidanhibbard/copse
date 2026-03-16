import { git } from './git'

export function pruneWorktrees(cwd?: string): void {
  git(['worktree', 'prune'], cwd)
}
