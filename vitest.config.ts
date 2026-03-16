import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['spec/**/*.spec.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/types/**'],
    },
  },
})
