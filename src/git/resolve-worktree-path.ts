import path from 'node:path'
import { getRepoRoot } from './get-repo-root'
import { sanitizeBranch } from './sanitize-branch'

export function resolveWorktreePath(branch: string, customPath?: string, cwd?: string): string {
  if (customPath)
    return path.resolve(customPath)

  const repoRoot = getRepoRoot(cwd)
  const parentDir = path.dirname(repoRoot)
  const repoName = path.basename(repoRoot)
  return path.join(parentDir, `${repoName}-${sanitizeBranch(branch)}`)
}
