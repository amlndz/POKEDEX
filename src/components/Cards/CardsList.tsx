import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import {} from './DefaultCard/DefaultCard'
import { Pokemon } from '../../domain/models/Pokemon'
import { Skeleton } from './DefaultCard/Skeleton'
import { pokemonService } from '../../domain/services/pokemonService'

type CardSearchedType = {
  searched: string
}

export const CardList: React.FC<CardSearchedType> = ({ searched }) => {
  const [apiError, setApiError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const pokemonsData = await pokemonService.obtainPokemons()
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

  if (apiError) {
    return (
      <div className={style.containerCardsList}>
        <ErrorMSG />
      </div>
    )
  }

  if (loading) {
    return (
      <div className={style.containerCardsList}>
        <Skeleton />
      </div>
    )
  }

  const searchedPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searched.toLowerCase()),
  )

  const hasSearchError = searchedPokemons.length === 0

  if (hasSearchError) {
    return (
      <div className={style.containerCardsList}>
        <NotFound search={searched} />
      </div>
    )
  }

  return (
    <div className={style.containerCardsList}>
      {searchedPokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
