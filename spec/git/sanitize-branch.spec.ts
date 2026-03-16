import { describe, expect, it } from 'vitest'
import { sanitizeBranch } from '../../src/git/sanitize-branch'

describe('sanitizeBranch', () => {
  it('replaces slashes with dashes', () => {
    expect(sanitizeBranch('feature/auth')).toBe('feature-auth')
  })

  it('handles multiple slashes', () => {
    expect(sanitizeBranch('a/b/c/d')).toBe('a-b-c-d')
  })

  it('returns unchanged string with no slashes', () => {
    expect(sanitizeBranch('main')).toBe('main')
  })
})
