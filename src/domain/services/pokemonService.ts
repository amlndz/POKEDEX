import { Pokemon } from '../models/pokemon/Pokemon'
import {
  pokedexRepository,
  pokemonDetailRepository,
} from '../../infrastructure/api/pokeApi/pokemonDetail/pokemonDetailRepository'

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const pokemonsDTO = await pokedexRepository.fetchPokedex()

  const pokemonsData = await Promise.all(
    pokemonsDTO.map(async pokemonDTO => {
      const pokemonDetail = await pokemonDetailRepository.fetchPokemonDetail(
        pokemonDTO.url,
      )
      return pokemonDetail
    }),
  )
  return pokemonsData
}
