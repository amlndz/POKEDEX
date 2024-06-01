/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { UserConfig } from 'vitest'

type TestOption = 'unit' | 'integration'

const getTestConfig = (mode?: TestOption): UserConfig => {
  const sharedConfig: UserConfig = {
    globals: true,
  }

  if (mode === 'unit') {
    return {
      ...sharedConfig,
      include: ['**/*.test.ts'],
    }
  }

  const integrationConfig: UserConfig = {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  }

  if (mode === 'integration') {
    return {
      ...sharedConfig,
      ...integrationConfig,
      include: ['**/*.test.tsx'],
    }
  }

  return {
    ...sharedConfig,
    ...integrationConfig,
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  test: getTestConfig(mode as TestOption),
}))
