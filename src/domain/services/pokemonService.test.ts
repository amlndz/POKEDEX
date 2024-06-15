import { pokemonService } from './pokemonService'
import { PokemonRepository } from '../models/pokemon/pokemonRepository'
import { Pokedex } from '../models/pokemon/Pokedex'
import { Pokemon } from '../models/pokemon/Pokemon'

const getPokedex = async (): Promise<Pokedex[]> => {
  return [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
}

const getPokemon = async (): Promise<Pokemon> => {
  return {
    name: 'bulbasaur',
    id: 1,
    image: 'bulbasaur-image-url',
    type: ['grass', 'poison'],
    weight: 6.9,
    height: 0.7,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      spattack: 65,
      spdefense: 65,
      speed: 45,
    },
  }
}

const testAPIRepo: PokemonRepository = {
  getPokedex,
  getPokemon,
}

test('Comprobar que la funcion obtainPokemon del Service devuelve un Pokemon', async () => {
  pokemonService.init(testAPIRepo)
  const pokemons = await pokemonService.obtainPokemons()
  const expectedPokemons = [
    {
      name: 'bulbasaur',
      id: 1,
      image: 'bulbasaur-image-url',
      type: ['grass', 'poison'],
      weight: 6.9,
      height: 0.7,
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spattack: 65,
        spdefense: 65,
        speed: 45,
      },
    },
  ]
  expect(pokemons).toStrictEqual(expectedPokemons)
})
