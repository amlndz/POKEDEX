import { fetchPokemons } from '../../domain/services/pokemonService'

export const ApiRequest = async () => {
  const pokemonsData = await fetchPokemons()
  return pokemonsData
}
