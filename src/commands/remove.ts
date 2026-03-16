import { defineCommand } from 'citty'
import { removeWorktree } from '../utils/git'

export default defineCommand({
  meta: {
    name: 'remove',
    description: 'Remove a worktree by branch name or path',
  },
  args: {
    branch: {
      type: 'positional',
      description: 'Branch name or path of the worktree to remove',
      required: true,
    },
    force: {
      type: 'boolean',
      description: 'Force removal even if the worktree has uncommitted changes',
      alias: ['f'],
      default: false,
    },
  },
  run({ args }) {
    console.log(`Removing worktree "${args.branch}"...`)
    removeWorktree(args.branch, { force: args.force })
    console.log('Worktree removed.')
  },
})
