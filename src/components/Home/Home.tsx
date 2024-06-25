import { useEffect, useState } from 'react'
import { CardList } from '../Cards/CardsList'
import { SearchedBox } from '../SearchedBox/SearchedBox'
import { Pokemon, PokemonType } from '../../domain/models/Pokemon'
import { pokemonService } from '../../domain/services/pokemonService'
import style from './Home.module.css'
import { TypeSelector } from '../TypeSelector/TypeSelector'
import { GenSelector } from '../GenSelector/GenSelector'
import { Generation } from '../../domain/models/Generacion'

export const Home = () => {
  const [hasSearched, setHasSearched] = useState('')
  const [hasApiError, setHasApiError] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(true)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [typeFilter, setTypeFilter] = useState<PokemonType[]>([])
  const [genFilter, setGenFilter] = useState<Generation>('kanto')
  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const pokemonsData = await pokemonService.obtainPokemons(genFilter)
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
        <TypeSelector typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        <GenSelector setGenFilter={setGenFilter} />
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
