# Getting Started

## Installation

Install copse globally:

```bash
npm install -g copse
```

Or with pnpm:

```bash
pnpm add -g copse
```

## Prerequisites

- **Git** (with worktree support, 2.5+)
- **Node.js** 18+
- An editor CLI on your PATH (`cursor`, `code`, `zed`, etc.)

## Quick Start

Navigate to any git repository and create your first worktree:

```bash
cd my-project

# Create a worktree for a new feature branch and open it in Cursor
copse add feature/auth
```

This creates a sibling directory `my-project-feature-auth` with a full working copy on the `feature/auth` branch, then opens it in Cursor.

Create another one:

```bash
copse add feature/api --editor code
```

Now you have two separate editor windows, each on its own branch, with no interference.

## How It Works

Copse manages worktrees as sibling directories next to your repository:

```
projects/
├── my-repo/                  # main worktree (your original clone)
├── my-repo-feature-auth/     # copse add feature/auth
├── my-repo-feature-api/      # copse add feature/api
└── my-repo-fix-login-bug/    # copse add fix/login-bug
```

Each worktree shares the same `.git` data (history, remotes, objects) but has its own working directory and index. Commits, pulls, and pushes work as normal in each worktree.

## Next Steps

See the full [Commands Reference](/guide/commands) for all available options.
