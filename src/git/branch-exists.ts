import { git } from './git'

export function branchExists(branch: string, cwd?: string): boolean {
  try {
    git(['rev-parse', '--verify', branch], cwd)
    return true
  }
  catch {
    return false
  }
}
