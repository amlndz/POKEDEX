import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect, vi } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Home } from './Home'
import { pokemonAPIRepository } from '../../infrastructure/api/pokeApi/pokemonDetail/repository/pokemonAPIRepository'
import { pokemonService } from '../../domain/services/pokemonService'
import { PokemonBuilder } from '../../../tests/builders/pokemonBuilder'

beforeEach(() => {
  pokemonService.init(pokemonAPIRepository)
})

describe('Test Home', () => {
  describe('Tests renderizado DefaultCards', () => {
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

    test('Mientras se cargan las peticiones se muestra DefaultCard', async () => {
      render(<Home />)

      const defaultCardElements = await screen.findAllByTestId('default-card')
      expect(defaultCardElements.length).toBeGreaterThan(0)
    })
  })

  describe('Test renderizado ErrorMsg', () => {
    test('Si se da un error la API se muestra errorMSG', async () => {
      const mock = new MockAdapter(axios)
      mock
        .onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
        .reply(500)

      render(<Home />)

      await waitFor(() => {
        expect(
          screen.getByText('An error ocurred getting Pokémons.'),
        ).toBeInTheDocument()
      })
    })

    test('Si se da pide a la API una url inexistente se muestra errorMSG', async () => {
      const mock = new MockAdapter(axios)
      mock.onGet('https://pokeapi.co/api/v2/nonexist').reply(400)
      render(<Home />)

      await waitFor(() => {
        expect(
          screen.getByText('An error ocurred getting Pokémons.'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Test renderizado NotFound', () => {
    test('Si un usuario introduce un pokemon que no existe se muestra NotFound', async () => {
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
      render(<Home />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'nonexistent' } })

      await screen.findByText('There is not results for "nonexistent".')
      const pokemonCardElements = screen.queryAllByTestId('pokemon-card')
      expect(pokemonCardElements.length).toBe(0)
    })
  })

  describe('Test renderizado Pokemon Cards', () => {
    test('Renderizado de las cards de pokemons', async () => {
      const pokemon = new PokemonBuilder().build()
      const serviceMock = vi
        .spyOn(pokemonService, 'obtainPokemons')
        .mockResolvedValue([pokemon])

      render(<Home />)
      expect(serviceMock).toHaveBeenCalledTimes(1)

      await waitFor(() => {
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        expect(screen.getByText(`#001`)).toBeInTheDocument()
        expect(screen.getByText('Grass')).toBeInTheDocument()
        expect(screen.getByText('Poison')).toBeInTheDocument()
        expect(screen.getByAltText('bulbasaur')).toHaveAttribute(
          'src',
          'bulbasaur-image-url',
        )
        expect(screen.getByText('6.9 kg')).toBeInTheDocument()
        expect(screen.getByText('0.7 m')).toBeInTheDocument()

        expect(screen.getByText('HP').nextElementSibling).toHaveTextContent(
          '045',
        )
        expect(screen.getByText('ATK').nextElementSibling).toHaveTextContent(
          '049',
        )
        expect(screen.getByText('DEF').nextElementSibling).toHaveTextContent(
          '049',
        )
        expect(screen.getByText('SAT').nextElementSibling).toHaveTextContent(
          '065',
        )
        expect(screen.getByText('SDF').nextElementSibling).toHaveTextContent(
          '065',
        )
        expect(screen.getByText('SPD').nextElementSibling).toHaveTextContent(
          '045',
        )
      })
    })

    test('Si un usuario busca un pokemon existente solo se muestra este', async () => {
      const pokemon = new PokemonBuilder().build()

      const serviceMock = vi
        .spyOn(pokemonService, 'obtainPokemons')
        .mockResolvedValue([pokemon])

      render(<Home />)
      expect(serviceMock).toHaveBeenCalledTimes(1)
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'bulbasaur' } })

      await waitFor(() => {
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
      })

      const pokemonCardElements = await screen.findAllByTestId('pokemon-card')
      expect(pokemonCardElements.length).toBe(1)
    })

    test('Si un usuario introduce letras que coinciden con mas de un pokemon se muestran estos (ej: char, se deberia de ver Charmander, Charmeleon, Charizard)', async () => {
      const bulbasaur = new PokemonBuilder().build()
      const charmander = new PokemonBuilder()
        .withName('charmander')
        .withId(4)
        .build()
      const charmeleon = new PokemonBuilder()
        .withName('charmeleon')
        .withId(5)
        .build()
      const charizard = new PokemonBuilder()
        .withName('charizard')
        .withId(6)
        .build()

      const serviceMock = vi
        .spyOn(pokemonService, 'obtainPokemons')
        .mockResolvedValue([bulbasaur, charmander, charmeleon, charizard])

      render(<Home />)
      expect(serviceMock).toHaveBeenCalledTimes(1)

      const previousPokemonCards = await screen.findAllByTestId('pokemon-card')
      expect(previousPokemonCards.length).toBe(4)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'char' } })
      await waitFor(() => {
        expect(screen.getByText('Charmander')).toBeInTheDocument()
        expect(screen.getByText('Charmeleon')).toBeInTheDocument()
        expect(screen.getByText('Charizard')).toBeInTheDocument()
      })

      const pokemonCardElements = await screen.findAllByTestId('pokemon-card')
      expect(pokemonCardElements.length).toBe(3)
    })
  })
})

describe('Testear filtro de pokemons por generacion', async () => {
  it('Dada una generacion se muestran solo los pokemons de esa generacion', () => {
    const bulbasaur = new PokemonBuilder().build()

    const serviceMock = vi
      .spyOn(pokemonService, 'obtainPokemons')
      .mockResolvedValue([bulbasaur])

    render(<Home />)
    expect(serviceMock).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Kanto')).toBeInTheDocument()
  })
})
