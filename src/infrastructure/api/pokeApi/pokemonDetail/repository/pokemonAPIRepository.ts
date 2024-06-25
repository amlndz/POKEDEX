import axios from 'axios'
import { Pokemon } from '../../../../../domain/models/Pokemon'
import { mapPokemonDTOToPokemon } from '../mapper/pokemonMapper'
import { PokemonDTO } from '../domain/pokemonDTO'
import { PokedexDTO } from '../../pokedex/domain/pokedexDTO'
import { Pokedex } from '../../../../../domain/models/Pokedex'
import { PokemonRepository } from '../../../../../domain/repository/PokemonRepository'

const getPokedex = async (
  offset: number,
  limit: number,
): Promise<Pokedex[]> => {
  const response = await axios.get<PokedexDTO>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  )
  const pokedex = response.data.results
  console.log('RESPUESTA: ' + JSON.stringify(pokedex))
  localStorage.setItem('pokedex', JSON.stringify(pokedex))
  return pokedex
}

const getPokemon = async (pokemonDTO: Pokedex): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonDTO>(pokemonDTO.url)
  const pokemonMapped = mapPokemonDTOToPokemon(data)
  localStorage.setItem(pokemonMapped.name, JSON.stringify(pokemonMapped))
  return pokemonMapped
}

export const pokemonAPIRepository: PokemonRepository = {
  getPokedex,
  getPokemon,
}
