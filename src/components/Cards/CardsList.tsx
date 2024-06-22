import { ErrorMSG } from './Error/ErrorMSG'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import { Pokemon, PokemonType } from '../../domain/models/Pokemon'
import { Skeleton } from './DefaultCard/Skeleton'

type CardSearchedType = {
  hasSearched: string
  hasApiError: boolean
  hasLoaded: boolean
  pokemons: Pokemon[]
  typeFilter: PokemonType[]
}

export const CardList: React.FC<CardSearchedType> = ({
  hasSearched,
  hasApiError,
  hasLoaded,
  pokemons,
  typeFilter,
}) => {
  if (hasApiError) {
    return <ErrorMSG />
  }

  if (hasLoaded) {
    return <Skeleton />
  }

  console.log('Type Filter:', typeFilter)

  const searchedPokemons = pokemons.filter(pokemon => {
    const matchesName = hasSearched
      ? pokemon.name.toLowerCase().includes(hasSearched.toLowerCase())
      : true
    const matchesType =
      typeFilter.length > 0
        ? typeFilter.length === 1
          ? pokemon.types.includes(typeFilter[0])
          : pokemon.types.length === typeFilter.length &&
            pokemon.types.every(type => typeFilter.includes(type))
        : true
    return matchesName && matchesType
  })

  const hasSearchError = searchedPokemons.length === 0

  if (hasSearchError) {
    return <NotFound search={hasSearched} />
  }

  return (
    <>
      {searchedPokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  )
}
