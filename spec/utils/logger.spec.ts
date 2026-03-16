import { describe, expect, it } from 'vitest'
import { logger } from '../../src/utils/logger'

describe('logger', () => {
  it('is a consola instance with the copse tag', () => {
    expect(logger).toBeDefined()
    expect(logger.options.defaults?.tag).toBe('copse')
  })
})
