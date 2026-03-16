import type { EditorName } from '../utils/editor'
import process from 'node:process'
import { defineCommand } from 'citty'
import { openEditor } from '../utils/editor'
import { findWorktreeByBranch, listWorktrees } from '../utils/git'

export default defineCommand({
  meta: {
    name: 'open',
    description: 'Open an existing worktree in an editor',
  },
  args: {
    branch: {
      type: 'positional',
      description: 'Branch name of the worktree to open',
      required: true,
    },
    editor: {
      type: 'string',
      description: 'Editor to open (cursor, code, zed, webstorm, etc.)',
      alias: ['e'],
      default: 'cursor',
    },
  },
  run({ args }) {
    const wt = findWorktreeByBranch(args.branch)

    if (!wt) {
      const available = listWorktrees()
        .map(w => w.branch)
        .filter((b): b is string => b !== null)
        .join(', ')

      console.error(`No worktree found for branch "${args.branch}".`)
      if (available) {
        console.error(`Available branches: ${available}`)
      }
      process.exit(1)
    }

    const editor = args.editor as EditorName
    console.log(`Opening ${wt.path} in ${editor}...`)
    openEditor(wt.path, editor)
  },
})
