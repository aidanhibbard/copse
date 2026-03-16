# Commands

## `copse add <branch>`

Create a new worktree for a branch and optionally open it in an editor.

If the branch does not exist, it is created automatically.

```bash
copse add feature/auth
copse add feature/api --editor code
copse add feature/dashboard --path ./dashboard-wt
copse add feature/tests --no-open
```

| Option     | Alias | Default  | Description                                     |
| ---------- | ----- | -------- | ----------------------------------------------- |
| `--editor` | `-e`  | `cursor` | Editor to open the worktree in                  |
| `--path`   | `-p`  |          | Custom directory path for the worktree          |
| `--no-open`|       |          | Skip opening an editor after creation           |

## `copse list`

List all worktrees in the current repository with their paths, HEAD commit, and branch names.

```bash
copse list
```

Example output:

```
  /Users/me/projects/my-repo              a1b2c3d4  main [main]
  /Users/me/projects/my-repo-feature-auth e5f6g7h8  feature/auth
  /Users/me/projects/my-repo-feature-api  i9j0k1l2  feature/api
```

## `copse open <branch>`

Open an existing worktree in an editor.

```bash
copse open feature/auth
copse open feature/api --editor code
```

| Option     | Alias | Default  | Description                    |
| ---------- | ----- | -------- | ------------------------------ |
| `--editor` | `-e`  | `cursor` | Editor to open the worktree in |

## `copse remove <branch>`

Remove a worktree by branch name or path.

```bash
copse remove feature/auth
copse remove feature/auth --force
```

| Option    | Alias | Default | Description                                          |
| --------- | ----- | ------- | ---------------------------------------------------- |
| `--force` | `-f`  | `false` | Force removal even with uncommitted changes          |

## Supported Editors

Any value passed to `--editor` is used as the command name. These are the well-known editors:

| Editor   | Value      |
| -------- | ---------- |
| Cursor   | `cursor`   |
| VS Code  | `code`     |
| Zed      | `zed`      |
| WebStorm | `webstorm` |
| IntelliJ | `idea`     |
| Neovim   | `nvim`     |
| Vim      | `vim`      |
