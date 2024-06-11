import { Pokemon } from '../PokemonType'

type PokemonCardProps = {
  pokemon: Pokemon
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="">
      <img src={pokemon.image || DEFAULT_IMAGE_URL} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>HP: {pokemon.stats.hp}</p>
      <p>Attack: {pokemon.stats.attack}</p>
      <p>Defense: {pokemon.stats.defense}</p>
      <p>Special Attack: {pokemon.stats.spattack}</p>
      <p>Special Defense: {pokemon.stats.spdefense}</p>
      <p>Speed: {pokemon.stats.speed}</p>
    </div>
  )
}
