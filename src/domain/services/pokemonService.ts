import { Generation } from '../models/Generacion'
import { Pokemon } from '../models/Pokemon'
import { PokemonRepository } from '../repository/PokemonRepository'

let repo: PokemonRepository

const obtainPokemons = async (generation: Generation): Promise<Pokemon[]> => {
  const pokedexDTO = await repo.getPokedexByGen(generation)
  const pokemonsData = await Promise.all(
    pokedexDTO.map(async pokemonDTO => {
      const pokemonDetail = await repo.getPokemon(pokemonDTO)
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
