import { GENERATIONS_GUIDE } from '../../infrastructure/api/pokeApi/generation/generation'
import { Generation } from '../models/Generacion'
import { Pokemon } from '../models/Pokemon'
import { PokemonRepository } from '../repository/PokemonRepository'

let repo: PokemonRepository

const obtainPokemons = async (generation: Generation): Promise<Pokemon[]> => {
  const pokedexDTO = await repo.getPokedex(
    GENERATIONS_GUIDE[generation].offset,
    GENERATIONS_GUIDE[generation].limit,
  )
  const pokemonsData = await Promise.all(
    pokedexDTO.map(async pokemonDTO => {
      const pokemonDetail = await repo.getPokemon(pokemonDTO)
      console.log('POKEMON: ' + JSON.stringify(pokemonDetail))
      return pokemonDetail
    }),
  )

  return pokemonsData
}

const init = (newRepo: PokemonRepository) => {
  repo = newRepo
}

export const pokemonService = {
  obtainPokemons,
  init,
}
