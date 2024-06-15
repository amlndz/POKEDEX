import { Pokedex } from '../../../../../domain/models/pokemon/Pokedex'

export type PokedexDTO = {
  count: number
  next: string | null
  previous: string | null
  results: Pokedex[]
}
