import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../../../src/App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

test('Se cargan los 151 pokemons', async () => {
  const mock = new MockAdapter(axios)

  const pokemonList: { name: string; url: string }[] = []
  for (let i = 1; i <= 151; i++) {
    pokemonList.push({
      name: `pokemon${i}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i}/`,
    })
  }
  mock
    .onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .reply(200, {
      count: 151,
      next: null,
      previous: null,
      results: pokemonList,
    })

  for (let i = 1; i <= 151; i++) {
    mock.onGet(`https://pokeapi.co/api/v2/pokemon/${i}/`).reply(200, {
      name: `pokemon${i}`,
      id: i,
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'pokemon-image-url',
          },
        },
      },
      types: [{ type: { name: 'any' } }],
      weight: 69,
      height: 7,
      stats: [
        { base_stat: 0, stat: { name: 'hp' } },
        { base_stat: 0, stat: { name: 'attack' } },
        { base_stat: 0, stat: { name: 'defense' } },
        { base_stat: 0, stat: { name: 'special-attack' } },
        { base_stat: 0, stat: { name: 'special-defense' } },
        { base_stat: 0, stat: { name: 'speed' } },
      ],
    })
  }
  render(<App />)

  const pokemonCardElements = await screen.findAllByTestId('pokemon-card')
  expect(pokemonCardElements.length).toBe(151)
})
