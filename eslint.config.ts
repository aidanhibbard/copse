import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    overrides: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
})
