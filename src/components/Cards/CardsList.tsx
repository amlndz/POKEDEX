import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import { DefaultCard } from './DefaultCard/DefaultCard'

type RespuestaApiPokedex = {
  count: number
  next: string | null
  previous: string | null
  results: PokedexDTO[]
}

type PokedexDTO = {
  name: string
  url: string
}

type RespuestaPokemonAPI = {
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

type PokemonDTO = {
  name: string
  id: number
  image: string
  type: string[]
  weight: number
  height: number
  hp: number
  attack: number
  defense: number
  spattack: number
  spdefense: number
  speed: number
}

type CardSearchedType = {
  searched: string
}

export const CardList: React.FC<CardSearchedType> = ({ searched }) => {
  const [apiError, setApiError] = useState(false)
  const [searchedError, setSearchedError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([])

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const response = await axios.get<RespuestaApiPokedex>(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        )

        const pokemonPromises = response.data.results.map(async pokemon => {
          const response2 = await axios.get<RespuestaPokemonAPI>(pokemon.url)
          const pokemonData = response2.data

          return {
            name: pokemonData.name,
            id: pokemonData.id,
            image: pokemonData.sprites.other['official-artwork'].front_default,
            type: pokemonData.types.map(typeInfo => typeInfo.type.name),
            weight: pokemonData.weight,
            height: pokemonData.height,
            hp: pokemonData.stats.find(stat => stat.stat.name === 'hp')
              ?.base_stat,
            attack: pokemonData.stats.find(stat => stat.stat.name === 'attack')
              ?.base_stat,
            defense: pokemonData.stats.find(
              stat => stat.stat.name === 'defense',
            )?.base_stat,
            spattack: pokemonData.stats.find(
              stat => stat.stat.name === 'special-attack',
            )?.base_stat,
            spdefense: pokemonData.stats.find(
              stat => stat.stat.name === 'special-defense',
            )?.base_stat,
            speed: pokemonData.stats.find(stat => stat.stat.name === 'speed')
              ?.base_stat,
          } as PokemonDTO
        })

        const pokemonData = await Promise.all(pokemonPromises)
        setPokemons(pokemonData)
        setApiError(false)
      } catch (error) {
        setApiError(true)
        console.error('[!] - Error en la respuesta de la API')
      } finally {
        setLoading(false)
      }
    }
    fetchPokedex()
  }, [])

  useEffect(() => {
    const searchedExists = pokemons.find(pokemon =>
      pokemon.name.toLowerCase().includes(searched.toLowerCase()),
    )
    setSearchedError(!searchedExists)
  }, [pokemons, searched])

  return (
    <div className={style['containerCardsList']}>
      {apiError && <ErrorMSG />}

      {loading && (
        <>
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
        </>
      )}

      {!loading && !apiError && (
        <>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searched.toLowerCase()),
            )
            .map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </>
      )}
      {searchedError && <NotFound search={searched} />}
    </div>
  )
}
