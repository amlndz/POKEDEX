import { Generation } from '../../../domain/models/Generacion'
import { Pokedex } from '../../../domain/models/Pokedex'
import { Pokemon } from '../../../domain/models/Pokemon'
import { PokemonRepository } from '../../../domain/repository/pokemonRepository'
import { pokemonAPIRepository } from '../../api/pokeApi/pokemonDetail/repository/pokemonAPIRepository'

const getPokedexByGen = async (generation: Generation): Promise<Pokedex[]> => {
  const storedPokedex = localStorage.getItem(generation)
  if (storedPokedex) {
    return JSON.parse(storedPokedex)
  }
  return pokemonAPIRepository.getPokedexByGen(generation)
}

const getPokemon = async (pokedex: Pokedex): Promise<Pokemon> => {
  const pokemonJSON = localStorage.getItem(pokedex.name)
  if (pokemonJSON) {
    return JSON.parse(pokemonJSON)
  }
  return pokemonAPIRepository.getPokemon(pokedex)
}

export const pokemonHybridRepository: PokemonRepository = {
  getPokedexByGen: getPokedexByGen,
  getPokemon,
}
