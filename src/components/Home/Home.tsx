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
  const [genFilter, setGenFilter] = useState<Generation[]>(['Kanto'])

  useEffect(() => {
    const fetchPokedex = async () => {
      setHasLoaded(true)
      try {
        const pokemonsData: Pokemon[] = []
        for (const gen of genFilter) {
          const data = await pokemonService.obtainPokemons(gen)
          pokemonsData.push(...data)
        }
        setPokemons(pokemonsData)
      } catch (error) {
        setHasApiError(true)
        console.error('[!] - Error en la respuesta de la API')
      } finally {
        setHasLoaded(false)
      }
    }
    fetchPokedex()
  }, [genFilter])

  return (
    <>
      <div className={style.containerSearch}>
        <SearchedBox onChange={setHasSearched} />
        <div className={style.selectors}>
          <TypeSelector
            typeFilter={typeFilter}
            onTypeSelected={setTypeFilter}
          />
          <GenSelector genFilter={genFilter} onGenSelected={setGenFilter} />
        </div>
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
