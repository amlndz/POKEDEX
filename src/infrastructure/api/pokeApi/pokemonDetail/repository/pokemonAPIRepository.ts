import axios from 'axios'
import { Pokemon } from '../../../../../domain/models/Pokemon'
import { mapPokemonDTOToPokemon } from '../mapper/pokemonMapper'
import { PokemonDTO } from '../domain/pokemonDTO'
import { PokedexDTO } from '../../pokedex/domain/pokedexDTO'
import { Pokedex } from '../../../../../domain/models/Pokedex'
import { PokemonRepository } from '../../../../../domain/repository/PokemonRepository'

const getPokedex = async (): Promise<Pokedex[]> => {
  const response = await axios.get<PokedexDTO>(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  )
  const pokedex = response.data.results
  return pokedex
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonDTO>(id)
  return mapPokemonDTOToPokemon(data)
}

export const pokemonAPIRepository: PokemonRepository = {
  getPokedex,
  getPokemon,
}
