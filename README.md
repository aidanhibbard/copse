# Copse

Git worktree manager — create worktrees and open editors for parallel development.

Work on multiple features simultaneously, each in its own editor window. No more stashing, no more branch switching.

## Install

```bash
npm install -g copse
```

## Usage

### Create a worktree

```bash
# Create a worktree for a branch and open it in Cursor
copse add feature/auth

# Use a different editor
copse add feature/api --editor code

# Custom path
copse add feature/dashboard --path ./dashboard-wt

# Create without opening an editor
copse add feature/tests --no-open
```

### List worktrees

```bash
copse list
```

### Open an existing worktree

```bash
# Open in Cursor (default)
copse open feature/auth

# Open in VS Code
copse open feature/auth --editor code
```

### Remove a worktree

```bash
copse remove feature/auth

# Force remove
copse remove feature/auth --force
```

## Supported Editors

| Editor   | Flag value |
| -------- | ---------- |
| Cursor   | `cursor`   |
| VS Code  | `code`     |
| Zed      | `zed`      |
| WebStorm | `webstorm` |
| Neovim   | `nvim`     |
| Vim      | `vim`      |

Any other value is treated as a command name — pass whatever editor CLI you have on your PATH.

## How It Works

Copse wraps `git worktree` to manage worktrees as sibling directories:

```
projects/
├── my-repo/              # main worktree
├── my-repo-feature-auth/ # copse add feature/auth
├── my-repo-feature-api/  # copse add feature/api
└── my-repo-fix-bug/      # copse add fix/bug
```

Each worktree gets its own directory with a full working copy, and copse opens it in a separate editor instance so you can work on features in parallel.

## License

MIT
