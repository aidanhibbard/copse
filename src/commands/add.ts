import type { EditorName } from '../types'
import { defineCommand } from 'citty'
import { openEditor } from '../editor'
import { addWorktree, branchExists, resolveWorktreePath } from '../git'
import { logger } from '../utils/logger'

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Create a new worktree for a branch and optionally open it in an editor',
  },
  args: {
    branch: {
      type: 'positional',
      description: 'Branch name for the new worktree',
      required: true,
    },
    path: {
      type: 'string',
      description: 'Custom path for the worktree directory',
      alias: ['p'],
    },
    editor: {
      type: 'string',
      description: 'Editor to open (cursor, code, zed, webstorm, etc.)',
      alias: ['e'],
      default: 'cursor',
    },
    open: {
      type: 'boolean',
      description: 'Open the worktree in an editor after creation',
      default: true,
    },
  },
  run({ args }) {
    const branch = args.branch
    const isNew = !branchExists(branch)
    const wtPath = resolveWorktreePath(branch, args.path)

    logger.info(`Creating worktree for branch "${branch}" at ${wtPath}...`)

    const created = addWorktree(branch, wtPath, { newBranch: isNew })

    logger.success(`Worktree created at ${created}`)

    if (args.open) {
      const editor = args.editor as EditorName
      logger.info(`Opening in ${editor}...`)
      openEditor(created, editor)
    }
  },
})
