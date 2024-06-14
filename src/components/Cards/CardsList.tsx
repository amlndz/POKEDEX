import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import {} from './DefaultCard/DefaultCard'
import { Pokemon } from './PokemonType'
import { Skeleton } from './DefaultCard/Skeleton'

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

type CardSearchedType = {
  searched: string
}

export const CardList: React.FC<CardSearchedType> = ({ searched }) => {
  const [apiError, setApiError] = useState(false)
  const [searchedError, setSearchedError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
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
                pokemonData.stats.find(stat => stat.stat.name === 'hp')
                  ?.base_stat ?? 0,
              attack:
                pokemonData.stats.find(stat => stat.stat.name === 'attack')
                  ?.base_stat ?? 0,
              defense:
                pokemonData.stats.find(stat => stat.stat.name === 'defense')
                  ?.base_stat ?? 0,
              spattack:
                pokemonData.stats.find(
                  stat => stat.stat.name === 'special-attack',
                )?.base_stat ?? 0,
              spdefense:
                pokemonData.stats.find(
                  stat => stat.stat.name === 'special-defense',
                )?.base_stat ?? 0,
              speed:
                pokemonData.stats.find(stat => stat.stat.name === 'speed')
                  ?.base_stat ?? 0,
            },
          }
        })
        setApiError(false)
        setPokemons(pokemonsData)
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
      {loading && <Skeleton />}

      {!loading && apiError && <ErrorMSG />}

      {!loading && !apiError && (
        <>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searched.toLowerCase()),
            )
            .map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          {searchedError && <NotFound search={searched} />}
        </>
      )}
    </div>
  )
}
