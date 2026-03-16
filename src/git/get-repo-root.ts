import { git } from './git'

export function getRepoRoot(cwd?: string): string {
  return git(['rev-parse', '--show-toplevel'], cwd)
}
