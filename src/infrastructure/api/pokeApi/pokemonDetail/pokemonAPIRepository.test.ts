import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { pokemonAPIRepository } from './pokemonAPIRepository'
import { Pokemon } from '../../../../domain/models/pokemon/Pokemon'
import * as mapService from './pokemonMapper'

describe('Comprobar funcionamiento del pokemonAPIRepository', () => {
  test('Comprobar que la funcion getPokedex devuelve correctamente un array de Pokedex', async () => {
    const mock = new MockAdapter(axios)

    mock
      .onGet('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
      .reply(200, {
        count: 1,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        ],
      })

    const expectedPokedex = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ]
    const pokedex = await pokemonAPIRepository.getPokedex()

    expect(pokedex).toStrictEqual(expectedPokedex)
  })

  test('Comprobar que la funcion getPokemon devuelve un pokemon correctamente', async () => {
    const mock = new MockAdapter(axios)

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

    const expectedPokemon: Pokemon = {
      name: 'bulbasaur',
      id: 1,
      image: 'bulbasaur-image-url',
      type: ['grass', 'poison'],
      weight: 6.9,
      height: 0.7,
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spattack: 65,
        spdefense: 65,
        speed: 45,
      },
    }

    const mockeMap = vi
      .spyOn(mapService, 'mapPokemonDTOToPokemon')
      .mockReturnValueOnce(expectedPokemon)

    const pokemon = await pokemonAPIRepository.getPokemon(
      'https://pokeapi.co/api/v2/pokemon/1/',
    )
    expect(mockeMap).toHaveBeenCalledWith({
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
    expect(pokemon).toStrictEqual(expectedPokemon)
  })
})
