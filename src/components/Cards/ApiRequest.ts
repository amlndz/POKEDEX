import axios from 'axios'
import { Pokemon } from './PokemonType'

type PokedexDTO = {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

type PokemonDTO = {
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
      name: string
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

export const ApiRequest = async () => {
  const response = await axios.get<PokedexDTO>(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  )

  const pokemonPromises = response.data.results.map(async pokemon => {
    const { data } = await axios.get<PokemonDTO>(pokemon.url)
    return data
  })

  const pokemonsDTO = await Promise.all(pokemonPromises)

  const pokemonsData = pokemonsDTO.map<Pokemon>(pokemonData => {
    return {
      name: pokemonData.name,
      id: pokemonData.id,
      image: pokemonData.sprites.other['official-artwork'].front_default,
      type: pokemonData.types.map(typeInfo => typeInfo.type.name),
      weight: pokemonData.weight / 10,
      height: pokemonData.height / 10,
      stats: {
        hp:
          pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat ??
          0,
        attack:
          pokemonData.stats.find(stat => stat.stat.name === 'attack')
            ?.base_stat ?? 0,
        defense:
          pokemonData.stats.find(stat => stat.stat.name === 'defense')
            ?.base_stat ?? 0,
        spattack:
          pokemonData.stats.find(stat => stat.stat.name === 'special-attack')
            ?.base_stat ?? 0,
        spdefense:
          pokemonData.stats.find(stat => stat.stat.name === 'special-defense')
            ?.base_stat ?? 0,
        speed:
          pokemonData.stats.find(stat => stat.stat.name === 'speed')
            ?.base_stat ?? 0,
      },
    }
  })
  return pokemonsData
}
