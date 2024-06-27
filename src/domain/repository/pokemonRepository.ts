import { Generation } from '../models/Generacion'
import { Pokedex } from '../models/Pokedex'
import { Pokemon } from '../models/Pokemon'

type getPokedexByGen = (generation: Generation) => Promise<Pokedex[]>
type getPokemon = (pokemonDTO: Pokedex) => Promise<Pokemon>

export type PokemonRepository = {
  getPokedexByGen: getPokedexByGen
  getPokemon: getPokemon
}
