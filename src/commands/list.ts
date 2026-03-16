import { defineCommand } from 'citty'
import { listWorktrees } from '../git'
import { logger } from '../utils/logger'

export default defineCommand({
  meta: {
    name: 'list',
    description: 'List all worktrees in the current repository',
  },
  args: {},
  run() {
    const worktrees = listWorktrees()

    if (worktrees.length === 0) {
      logger.info('No worktrees found.')
      return
    }

    const maxPathLen = Math.max(...worktrees.map(wt => wt.path.length))

    for (const wt of worktrees) {
      const branch = wt.branch ?? (wt.detached ? '(detached)' : '(bare)')
      const label = wt.main ? ' [main]' : ''
      const shortHead = wt.head.slice(0, 8)
      logger.log(`  ${wt.path.padEnd(maxPathLen)}  ${shortHead}  ${branch}${label}`)
    }
  },
})
