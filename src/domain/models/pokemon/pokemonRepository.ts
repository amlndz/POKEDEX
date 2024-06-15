import { Pokedex } from './Pokedex'
import { Pokemon } from './Pokemon'

type getPokedex = () => Promise<Pokedex[]>
type getPokemon = (id: string) => Promise<Pokemon>

export type PokemonRepository = {
  getPokedex: getPokedex
  getPokemon: getPokemon
}
