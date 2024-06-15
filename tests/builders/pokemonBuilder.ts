import { Pokemon } from '../../src/domain/models/Pokemon'

export class PokemonBuilder {
  private pokemon: Pokemon

  constructor() {
    this.pokemon = {
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

  withname(name: string) {
    this.pokemon.name = name
    return this
  }

  withId(id: number) {
    this.pokemon.id = id
    return this
  }

  whitImage(image: string) {
    this.pokemon.image = image
    return this
  }

  withType(type: string[]) {
    this.pokemon.type = type
    return this
  }

  withWeight(weight: number) {
    this.pokemon.weight = weight
    return this
  }

  withHeight(height: number) {
    this.pokemon.height = height
    return this
  }

  withStats(stats: {
    hp: number
    attack: number
    defense: number
    spattack: number
    spdefense: number
    speed: number
  }) {
    this.pokemon.stats = stats
    return this
  }

  build() {
    return this.pokemon
  }
}
