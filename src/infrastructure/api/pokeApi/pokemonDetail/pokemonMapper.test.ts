import { PokemonBuilder } from '../../../../../tests/builders/pokemonBuilder'
import { PokemonDTOBuilder } from '../../../../../tests/builders/pokemonDTOBuilder'
import { Pokemon } from '../../../../domain/models/Pokemon'
import { PokemonDTO } from './domain/pokemonDTO'
import { mapPokemonDTOToPokemon } from './pokemonMapper'

describe('Comprobar funcionamiento del pokemonMapper', () => {
  test('Dado un pokemonDTO con todos los valores NO nulos devuelve un Pokemon', () => {
    const pokemonDTO: PokemonDTO = new PokemonDTOBuilder().build()

    const pokemon: Pokemon = new PokemonBuilder().build()

    const pokemonMapped = mapPokemonDTOToPokemon(pokemonDTO)
    expect(pokemonMapped).toStrictEqual(pokemon)
  })

  test('Dado un pokemonDTO con todos los valores de las stats nulos devuelve un Pokemon sustituyendo dicho valor de la stat por 0', () => {
    const pokemonDTO: PokemonDTO = new PokemonDTOBuilder()
      .withoutStats()
      .build()

    const pokemon: Pokemon = new PokemonBuilder()
      .withStats({
        hp: 0,
        attack: 0,
        defense: 0,
        spattack: 0,
        spdefense: 0,
        speed: 0,
      })
      .build()

    const pokemonMapped = mapPokemonDTOToPokemon(pokemonDTO)
    expect(pokemonMapped).toStrictEqual(pokemon)
  })
})
