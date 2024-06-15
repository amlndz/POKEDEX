import { Pokemon } from '../models/pokemon/Pokemon'
import { pokemonDetailRepository } from '../../infrastructure/api/pokeApi/pokemonDetail/pokemonDetailRepository'
import axios from 'axios'
import { PokedexDTO } from '../../infrastructure/api/pokeApi/pokedex/domain/pokedexDTO'

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get<PokedexDTO>(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  )
  const pokemonsDTO = response.data.results
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
