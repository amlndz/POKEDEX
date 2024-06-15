import { PokemonBuilder } from '../../../../../tests/builders/pokemonBuilder'
import { PokemonDTOBuilder } from '../../../../../tests/builders/pokemonDTOBuilder'
import { Pokemon } from '../../../../domain/models/Pokemon'
import { PokemonDTO } from './domain/pokemonDTO'
import { mapPokemonDTOToPokemon } from './pokemonMapper'

describe('Comprobar funcionamiento del pokemonMapper', () => {
  test('Dado un pokemonDTO con todos los valores NO nulos devuelve un Pokemon', () => {
    const pokemonDTO: PokemonDTO = {
      name: 'bulbasaur',
      id: 1,
      sprites: {
        other: {
          'official-artwork': { front_default: 'ruta/a/imagen' },
        },
      },
      types: [
        {
          type: {
            name: 'grass',
          },
        },
        {
          type: {
            name: 'poison',
          },
        },
      ],
      weight: 69,
      height: 7,
      stats: [
        {
          base_stat: 45,
          stat: {
            name: 'hp',
          },
        },
        {
          base_stat: 49,
          stat: {
            name: 'attack',
          },
        },
        {
          base_stat: 49,
          stat: {
            name: 'defense',
          },
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-attack',
          },
        },
        {
          base_stat: 65,
          stat: {
            name: 'special-defense',
          },
        },
        {
          base_stat: 45,
          stat: {
            name: 'speed',
          },
        },
      ],
    }

    const pokemon: Pokemon = {
      name: 'bulbasaur',
      id: 1,
      image: 'ruta/a/imagen',
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

    const pokemonMapped = mapPokemonDTOToPokemon(pokemonDTO)
    expect(pokemonMapped).toStrictEqual(pokemon)
  })
  test('Dado un pokemonDTO con todos los valores nulos devuelve un Pokemon sustituyendo dicho valor por 0', () => {
    const pokemonDTO: PokemonDTO = new PokemonDTOBuilder().build()

    const pokemon: Pokemon = new PokemonBuilder().build()

    const pokemonMapped = mapPokemonDTOToPokemon(pokemonDTO)
    expect(pokemonMapped).toStrictEqual(pokemon)
  })
})
