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

test('Si un usuario busca un pokemon existente solo se muestra este', async () => {
  const mock = new MockAdapter(axios)

  mock
    .onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .reply(200, {
      count: 1,
      next: null,
      previous: null,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
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

  render(<App />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'bulbasaur' } })
  await screen.findByText('bulbasaur')
  const pokemonCardElements = await screen.findAllByTestId('pokemon-card')
  expect(pokemonCardElements.length).toBe(1)
})
