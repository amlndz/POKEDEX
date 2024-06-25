import { Pokedex } from '../../../domain/models/Pokedex'
import { Pokemon } from '../../../domain/models/Pokemon'
import { PokemonRepository } from '../../../domain/repository/PokemonRepository'
import { pokemonAPIRepository } from '../../api/pokeApi/pokemonDetail/repository/pokemonAPIRepository'

const getPokedex = async (): Promise<Pokedex[]> => {
  const storedPokedex = localStorage.getItem('pokedex')
  if (storedPokedex) {
    return JSON.parse(storedPokedex)
  }
  return pokemonAPIRepository.getPokedexByGen()
}

const getPokemon = async (pokedex: Pokedex): Promise<Pokemon> => {
  const pokemonJSON = localStorage.getItem(pokedex.name)
  if (pokemonJSON) {
    return JSON.parse(pokemonJSON)
  }
  return pokemonAPIRepository.getPokemon(pokedex)
}

export const pokemonHybridRepository: PokemonRepository = {
  getPokedexByGen: getPokedex,
  getPokemon,
}
