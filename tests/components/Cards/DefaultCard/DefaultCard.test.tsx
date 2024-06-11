import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../../../../src/App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

mock.onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0').reply(200, {
  count: 1,
  next: null,
  previous: null,
  results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
})

test('Mientras se cargan las peticiones se muestra DefaultCard', async () => {
  render(<App />)

  const defaultCardElements = await screen.findAllByTestId('default-card')
  expect(defaultCardElements.length).toBeGreaterThan(0)
})
