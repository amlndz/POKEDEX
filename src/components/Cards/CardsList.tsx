import { ErrorMSG } from './Error/ErrorMSG'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import {} from './DefaultCard/DefaultCard'
import { Pokemon } from '../../domain/models/Pokemon'
import { Skeleton } from './DefaultCard/Skeleton'

type CardSearchedType = {
  hasSearched: string
  hasApiError: boolean
  hasLoaded: boolean
  pokemons: Pokemon[]
}

export const CardList: React.FC<CardSearchedType> = ({
  hasSearched,
  hasApiError,
  hasLoaded,
  pokemons,
}) => {
  if (hasApiError) {
    return <ErrorMSG />
  }

  if (hasLoaded) {
    return <Skeleton />
  }

  const searchedPokemons = pokemons.filter(
    pokemon =>
      pokemon.name.toLowerCase().includes(hasSearched.toLowerCase()) ||
      pokemon.types.some(type => type.includes(hasSearched.toLowerCase())),
  )
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
