import { Pokemon } from '../models/Pokemon'
import { PokemonRepository } from '../repository/PokemonRepository'

let repo: PokemonRepository

const obtainPokemons = async (): Promise<Pokemon[]> => {
  const pokemonsDTO = await repo.getPokedex()

  const pokemonsData = await Promise.all(
    pokemonsDTO.map(async pokemonDTO => {
      const pokemonDetail = await repo.getPokemon(pokemonDTO.url)
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
