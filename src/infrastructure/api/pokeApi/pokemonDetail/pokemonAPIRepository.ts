import axios from 'axios'
import { Pokemon } from '../../../../domain/models/pokemon/Pokemon'
import { mapPokemonDTOToPokemon } from './pokemonMapper'
import { PokemonDTO } from './domain/pokemonDTO'
import { PokedexDTO } from '../pokedex/domain/pokedexDTO'
import { Pokedex } from '../../../../domain/models/pokemon/Pokedex'
import { PokemonRepository } from '../../../../domain/models/pokemon/pokemonRepository'

const getPokedex = async (): Promise<Pokedex[]> => {
  const response = await axios.get<PokedexDTO>(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  )
  const pokedex = await response.data.results
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
