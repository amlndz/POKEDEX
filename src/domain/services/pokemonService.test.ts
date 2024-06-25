import { pokemonService } from './pokemonService'
import { PokemonRepository } from '../repository/PokemonRepository'
import { Pokedex } from '../models/Pokedex'
import { Pokemon } from '../models/Pokemon'
import { PokemonBuilder } from '../../../tests/builders/pokemonBuilder'

const getPokedex = async (): Promise<Pokedex[]> => {
  return [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
}

const getPokemon = async (): Promise<Pokemon> => {
  return new PokemonBuilder().build()
}

const testAPIRepo: PokemonRepository = {
  getPokedexByGen: getPokedex,
  getPokemon,
}

test('Comprobar que la funcion obtainPokemon del Service devuelve un Pokemon', async () => {
  pokemonService.init(testAPIRepo)

  const pokemons = await pokemonService.obtainPokemons('kanto')

  const expectedPokemons = [new PokemonBuilder().build()]
  expect(pokemons).toStrictEqual(expectedPokemons)
})
