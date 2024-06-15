import { Pokemon } from '../models/pokemon/Pokemon'
import { PokemonRepository } from '../models/pokemon/pokemonRepository'

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

const init = (repoNew: PokemonRepository) => {
  repo = repoNew
}

export const pokemonService = {
  obtainPokemons,
  init,
}
