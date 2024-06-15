import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import {} from './DefaultCard/DefaultCard'
import { Pokemon } from '../../domain/models/pokemon/Pokemon'
import { Skeleton } from './DefaultCard/Skeleton'
import { ApiRequest } from './ApiRequest'

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
        const pokemonsData = await ApiRequest()
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
