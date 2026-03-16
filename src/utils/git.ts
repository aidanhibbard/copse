import { execFileSync } from 'node:child_process'
import path from 'node:path'

export interface WorktreeInfo {
  path: string
  head: string
  branch: string | null
  bare: boolean
  detached: boolean
  main: boolean
}

function git(args: string[], cwd?: string): string {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim()
}

export function getRepoRoot(cwd?: string): string {
  return git(['rev-parse', '--show-toplevel'], cwd)
}

export function getRepoName(cwd?: string): string {
  return path.basename(getRepoRoot(cwd))
}

export function listWorktrees(cwd?: string): WorktreeInfo[] {
  const raw = git(['worktree', 'list', '--porcelain'], cwd)
  if (!raw)
    return []

  const blocks = raw.split('\n\n').filter(Boolean)
  return blocks.map((block) => {
    const lines = block.split('\n')
    const wtPath = lines.find(l => l.startsWith('worktree '))?.slice('worktree '.length) ?? ''
    const head = lines.find(l => l.startsWith('HEAD '))?.slice('HEAD '.length) ?? ''
    const branchLine = lines.find(l => l.startsWith('branch '))
    const branch = branchLine ? branchLine.slice('branch '.length).replace('refs/heads/', '') : null
    const bare = lines.includes('bare')
    const detached = lines.includes('detached')
    const main = blocks.indexOf(block) === 0

    return { path: wtPath, head, branch, bare, detached, main }
  })
}

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

export function pruneWorktrees(cwd?: string): void {
  git(['worktree', 'prune'], cwd)
}

export function branchExists(branch: string, cwd?: string): boolean {
  try {
    git(['rev-parse', '--verify', branch], cwd)
    return true
  }
  catch {
    return false
  }
}

const SLASH_RE = /\//g

export function sanitizeBranch(branch: string): string {
  return branch.replace(SLASH_RE, '-')
}

export function resolveWorktreePath(branch: string, customPath?: string, cwd?: string): string {
  if (customPath)
    return path.resolve(customPath)

  const repoRoot = getRepoRoot(cwd)
  const parentDir = path.dirname(repoRoot)
  const repoName = path.basename(repoRoot)
  return path.join(parentDir, `${repoName}-${sanitizeBranch(branch)}`)
}

export function findWorktreeByBranch(branch: string, cwd?: string): WorktreeInfo | undefined {
  return listWorktrees(cwd).find(wt => wt.branch === branch)
}
