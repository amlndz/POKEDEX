import { render, screen, fireEvent } from '@testing-library/react'
import App from '../../../../src/App'
import '@testing-library/jest-dom'
import { expect } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

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

test('Si un usuario introduce letras que coinciden con mas de un pokemon se muestran estos (ej: char, se deberia de ver Charmander, Charmeleon, Charizard) ', async () => {
  const mock = new MockAdapter(axios)

  mock
    .onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    .reply(200, {
      count: 3,
      next: null,
      previous: null,
      results: [
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
      ],
    })

  mock.onGet('https://pokeapi.co/api/v2/pokemon/4/').reply(200, {
    name: 'charmander',
    id: 4,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'charmander-image-url',
        },
      },
    },
    types: [{ type: { name: 'fire' } }],
    weight: 85,
    height: 6,
    stats: [
      { base_stat: 39, stat: { name: 'hp' } },
      { base_stat: 52, stat: { name: 'attack' } },
      { base_stat: 43, stat: { name: 'defense' } },
      { base_stat: 60, stat: { name: 'special-attack' } },
      { base_stat: 50, stat: { name: 'special-defense' } },
      { base_stat: 65, stat: { name: 'speed' } },
    ],
  })

  mock.onGet('https://pokeapi.co/api/v2/pokemon/5/').reply(200, {
    name: 'charmeleon',
    id: 5,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'charmeleon-image-url',
        },
      },
    },
    types: [{ type: { name: 'fire' } }],
    weight: 19,
    height: 11,
    stats: [
      { base_stat: 58, stat: { name: 'hp' } },
      { base_stat: 64, stat: { name: 'attack' } },
      { base_stat: 58, stat: { name: 'defense' } },
      { base_stat: 80, stat: { name: 'special-attack' } },
      { base_stat: 65, stat: { name: 'special-defense' } },
      { base_stat: 80, stat: { name: 'speed' } },
    ],
  })
  mock.onGet('https://pokeapi.co/api/v2/pokemon/6/').reply(200, {
    name: 'charizard',
    id: 6,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'charizard-image-url',
        },
      },
    },
    types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
    weight: 90.5,
    height: 17,
    stats: [
      { base_stat: 78, stat: { name: 'hp' } },
      { base_stat: 84, stat: { name: 'attack' } },
      { base_stat: 78, stat: { name: 'defense' } },
      { base_stat: 109, stat: { name: 'special-attack' } },
      { base_stat: 85, stat: { name: 'special-defense' } },
      { base_stat: 100, stat: { name: 'speed' } },
    ],
  })

  render(<App />)
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'char' } })
  await screen.findByText('charmander')
  await screen.findByText('charmeleon')
  await screen.findByText('charizard')
  const pokemonCardElements = await screen.findAllByTestId('pokemon-card')
  expect(pokemonCardElements.length).toBe(3)
})