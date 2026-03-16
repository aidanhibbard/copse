export interface WorktreeInfo {
  path: string
  head: string
  branch: string | null
  bare: boolean
  detached: boolean
  main: boolean
}
