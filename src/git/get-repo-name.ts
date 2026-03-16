import path from 'node:path'
import { getRepoRoot } from './get-repo-root'

export function getRepoName(cwd?: string): string {
  return path.basename(getRepoRoot(cwd))
}
