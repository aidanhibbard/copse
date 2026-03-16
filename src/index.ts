#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'copse',
    version: '0.0.1',
    description: 'Git worktree manager — create worktrees and open editors for parallel development',
  },
  subCommands: {
    add: () => import('./commands/add').then(m => m.default),
    list: () => import('./commands/list').then(m => m.default),
    remove: () => import('./commands/remove').then(m => m.default),
    open: () => import('./commands/open').then(m => m.default),
  },
})

runMain(main)
