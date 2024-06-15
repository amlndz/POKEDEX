import axios from 'axios'
import { Pokemon } from '../../../../domain/models/pokemon/Pokemon'
import { mapPokemonDTOToPokemon } from './pokemonMapper'
import { PokemonDTO } from './domain/pokemonDTO'
import { PokedexDTO } from '../pokedex/domain/pokedexDTO'
import { Pokedex } from '../../../../domain/models/pokemon/Pokedex'

const fetchPokedex = async (): Promise<Pokedex[]> => {
  const response = await axios.get<PokedexDTO>(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  )
  return response.data.results
}

const fetchPokemonDetail = async (url: string): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonDTO>(url)
  return mapPokemonDTOToPokemon(data)
}

export const pokemonDetailRepository = {
  fetchPokemonDetail,
}

export const pokedexRepository = {
  fetchPokedex,
}
