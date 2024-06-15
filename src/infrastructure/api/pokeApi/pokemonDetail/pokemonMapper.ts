import { Pokemon } from '../../../../domain/models/pokemon/Pokemon'
import { PokemonDTO } from './domain/pokemonDTO'

export const mapPokemonDTOToPokemon: (
  dto: PokemonDTO,
) => Pokemon = pokemonData => {
  return {
    name: pokemonData.name,
    id: pokemonData.id,
    image: pokemonData.sprites.other['official-artwork'].front_default,
    type: pokemonData.types.map(typeInfo => typeInfo.type.name),
    weight: pokemonData.weight / 10,
    height: pokemonData.height / 10,
    stats: {
      hp:
        pokemonData.stats.find(stat => stat.stat.name === 'hp')?.base_stat ?? 0,
      attack:
        pokemonData.stats.find(stat => stat.stat.name === 'attack')
          ?.base_stat ?? 0,
      defense:
        pokemonData.stats.find(stat => stat.stat.name === 'defense')
          ?.base_stat ?? 0,
      spattack:
        pokemonData.stats.find(stat => stat.stat.name === 'special-attack')
          ?.base_stat ?? 0,
      spdefense:
        pokemonData.stats.find(stat => stat.stat.name === 'special-defense')
          ?.base_stat ?? 0,
      speed:
        pokemonData.stats.find(stat => stat.stat.name === 'speed')?.base_stat ??
        0,
    },
  }
}
