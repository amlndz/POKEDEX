import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'

test('Si cargamos la pagina se mostraran los componentes base de la pagina', () => {
  render(<App />)
  expect(screen.getByText('Pokédex')).toBeInTheDocument()
})
