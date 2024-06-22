import { useEffect, useState } from 'react'
import { CardList } from '../Cards/CardsList'
import { SearchedBox } from '../SearchedBox/SearchedBox'
import { Pokemon, PokemonType } from '../../domain/models/Pokemon'
import { pokemonService } from '../../domain/services/pokemonService'
import style from './Home.module.css'
import { FilterSelector } from '../FilterSelector/FilterSelector'

export const Home = () => {
  const [hasSearched, setHasSearched] = useState('')
  const [hasApiError, setHasApiError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [typeFilter, setTypeFilter] = useState<PokemonType[]>([])

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
      <div className={style.containerSearch}>
        <SearchedBox onChange={setHasSearched} />
        <FilterSelector typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
      </div>
      <div className={style.containerCardsList}>
        <CardList
          hasSearched={hasSearched}
          hasApiError={hasApiError}
          hasLoaded={hasLoaded}
          pokemons={pokemons}
          typeFilter={typeFilter}
        />
      </div>
    </>
  )
}
