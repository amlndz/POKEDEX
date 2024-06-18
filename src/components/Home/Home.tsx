import { useEffect, useState } from 'react'
import { CardList } from '../Cards/CardsList'
import { SearchedBox } from '../SearchedBox/SearchedBox'
import { Pokemon } from '../../domain/models/Pokemon'
import { pokemonService } from '../../domain/services/pokemonService'
import style from './CardList.module.css'

export const Home = () => {
  const [hasSearched, setHasSearched] = useState('')
  const [hasApiError, setHasApiError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const pokemonsData = await pokemonService.obtainPokemons()
        setPokemons(pokemonsData)
      } catch (error) {
        setHasApiError(true)
        console.error('[!] - Error en la respuesta de la API')
      } finally {
        setHasLoaded(false)
      }
    }
    fetchPokedex()
  }, [])

  return (
    <>
      <SearchedBox onChange={setHasSearched} />
      <div className={style.containerCardsList}>
        <CardList
          hasSearched={hasSearched}
          hasApiError={hasApiError}
          hasLoaded={hasLoaded}
          pokemons={pokemons}
        />
      </div>
    </>
  )
}
