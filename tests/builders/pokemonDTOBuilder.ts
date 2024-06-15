import { PokemonDTO } from '../../src/infrastructure/api/pokeApi/pokemonDetail/domain/pokemonDTO'

export class PokemonDTOBuilder {
  private pokemonDTO: PokemonDTO

  constructor() {
    this.pokemonDTO = {
      name: 'bulbasaur',
      id: 1,
      sprites: {
        other: {
          'official-artwork': {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          },
        },
      },
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      weight: 69,
      height: 7,
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } },
        { base_stat: 49, stat: { name: 'defense' } },
        { base_stat: 65, stat: { name: 'special-attack' } },
        { base_stat: 65, stat: { name: 'special-defense' } },
        { base_stat: 45, stat: { name: 'speed' } },
      ],
    }
  }

  withName(name: string) {
    this.pokemonDTO.name = name
    return this
  }

  withId(id: number) {
    this.pokemonDTO.id = id
    return this
  }

  withSprites(sprites: {
    other: { 'official-artwork': { front_default: string } }
  }) {
    this.pokemonDTO.sprites = sprites
    return this
  }

  withTypes(types: { type: { name: string } }[]) {
    this.pokemonDTO.types = types
    return this
  }

  withWeight(weight: number) {
    this.pokemonDTO.weight = weight
    return this
  }

  withHeight(height: number) {
    this.pokemonDTO.height = height
    return this
  }

  withStats(stats: { base_stat: number; stat: { name: string } }[]) {
    this.pokemonDTO.stats = stats
    return this
  }

  build() {
    return this.pokemonDTO
  }
}
