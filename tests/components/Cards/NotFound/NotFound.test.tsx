import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

mock.onGet('https://pokeapi.co/api/v2/pokemon/1/').reply(200, {
  name: 'bulbasaur',
  id: 1,
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'bulbasaur-image-url',
      },
    },
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  weight: 69,
  height: 7,
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
    { base_stat: 49, stat: { name: 'defense' } },
    { base_stat: 65, stat: { name: 'special-attack' } },
    { base_stat: 65, stat: { name: 'special-defense' } },
    { base_stat: 45, stat: { name: 'speed' } },
  ],
})

test('Si un usuario introduce un pokemon que no existe se muestra NotFound', async () => {
  render(<App />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'nonexistent' } })

  await screen.findByText('There is not results for "nonexistent".')
  const pokemonCardElements = screen.queryAllByTestId('pokemon-card')
  expect(pokemonCardElements.length).toBe(0)
})
