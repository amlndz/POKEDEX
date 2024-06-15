import axios from 'axios'
import { Pokemon } from '../../../../domain/models/pokemon/Pokemon'
import { mapPokemonDTOToPokemon } from './pokemonMapper'
import { PokemonDTO } from './domain/pokemonDTO'

const fetchPokemonDetail = async (url: string): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonDTO>(url)
  return mapPokemonDTOToPokemon(data)
}

export const pokemonDetailRepository = {
  fetchPokemonDetail,
}
