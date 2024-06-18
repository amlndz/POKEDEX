export type PokemonType =
  | 'grass'
  | 'bug'
  | 'electric'
  | 'ground'
  | 'fire'
  | 'fighting'
  | 'poison'
  | 'psychic'
  | 'fairy'
  | 'dragon'
  | 'flying'
  | 'ghost'
  | 'water'
  | 'ice'
  | 'normal'
  | 'rock'
  | 'steel'
  | 'dark'

export type Pokemon = {
  name: string
  id: number
  image: string
  types: PokemonType[]
  weight: number
  height: number
  stats: {
    hp: number
    attack: number
    defense: number
    spattack: number
    spdefense: number
    speed: number
  }
}
