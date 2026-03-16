const SLASH_RE = /\//g

export function sanitizeBranch(branch: string): string {
  return branch.replace(SLASH_RE, '-')
}
