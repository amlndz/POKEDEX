import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { pokemonAPIRepository } from './pokemonAPIRepository'
import { Pokemon } from '../../../../domain/models/Pokemon'
import * as mapService from './pokemonMapper'
import { PokemonDTOBuilder } from '../../../../../tests/builders/pokemonDTOBuilder'
import { PokemonDTO } from './domain/pokemonDTO'
import { PokemonBuilder } from '../../../../../tests/builders/pokemonBuilder'

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

    const pokemonDTO: PokemonDTO = new PokemonDTOBuilder().build()
    mock.onGet('https://pokeapi.co/api/v2/pokemon/1/').reply(200, pokemonDTO)

    const expectedPokemon: Pokemon = new PokemonBuilder().build()

    const mockeMap = vi
      .spyOn(mapService, 'mapPokemonDTOToPokemon')
      .mockReturnValueOnce(expectedPokemon)

    const pokemon = await pokemonAPIRepository.getPokemon(
      'https://pokeapi.co/api/v2/pokemon/1/',
    )
    expect(mockeMap).toHaveBeenCalledWith(pokemonDTO)
    expect(pokemon).toStrictEqual(expectedPokemon)
  })
})
