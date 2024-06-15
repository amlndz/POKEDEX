import { Pokedex } from '../models/Pokedex'
import { Pokemon } from '../models/Pokemon'

type getPokedex = () => Promise<Pokedex[]>
type getPokemon = (id: string) => Promise<Pokemon>

export type PokemonRepository = {
  getPokedex: getPokedex
  getPokemon: getPokemon
}
