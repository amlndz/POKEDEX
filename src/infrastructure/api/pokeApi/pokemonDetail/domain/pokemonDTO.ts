import { PokemonType } from '../../../../../domain/models/Pokemon'

export type PokemonDTO = {
  name: string
  id: number
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: {
    type: {
      name: PokemonType
    }
  }[]
  weight: number
  height: number
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}
