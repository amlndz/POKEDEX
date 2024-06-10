type PokemonDTO = {
  name: string
  id: number
  image: string
  type: string[]
  weight: number
  height: number
  hp: number
  attack: number
  defense: number
  spattack: number
  spdefense: number
  speed: number
}

type PokemonCardProps = {
  pokemon: PokemonDTO
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image || DEFAULT_IMAGE_URL} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>HP: {pokemon.hp}</p>
      <p>Attack: {pokemon.attack}</p>
      <p>Defense: {pokemon.defense}</p>
      <p>Special Attack: {pokemon.spattack}</p>
      <p>Special Defense: {pokemon.spdefense}</p>
      <p>Speed: {pokemon.speed}</p>
    </div>
  )
}
