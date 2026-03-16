import type { WorktreeInfo } from '../types'
import { git } from './git'

export function listWorktrees(cwd?: string): WorktreeInfo[] {
  const raw = git(['worktree', 'list', '--porcelain'], cwd)
  if (!raw)
    return []

  const blocks = raw.split('\n\n').filter(Boolean)
  return blocks.map((block, index) => {
    const lines = block.split('\n')
    const wtPath = lines.find(l => l.startsWith('worktree '))?.slice('worktree '.length) ?? ''
    const head = lines.find(l => l.startsWith('HEAD '))?.slice('HEAD '.length) ?? ''
    const branchLine = lines.find(l => l.startsWith('branch '))
    const branch = branchLine ? branchLine.slice('branch '.length).replace('refs/heads/', '') : null
    const bare = lines.includes('bare')
    const detached = lines.includes('detached')

    return { path: wtPath, head, branch, bare, detached, main: index === 0 }
  })
}
