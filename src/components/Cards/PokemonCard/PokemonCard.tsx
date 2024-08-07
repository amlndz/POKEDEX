import { PokemonColorIcon } from '../PokemonColorIcon'
import { Pokemon } from '../../../domain/models/Pokemon'
import { PokemonStats } from './Components/Stats/StatList'
import style from './PokemonCard.module.css'
import { PokemonType } from './Components/PokemonType'
import { PokemonMeasures } from './Components/PokemonMeasures'
type PokemonCardProps = {
  pokemon: Pokemon
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const tipoPrincipal = pokemon.types[0]
  const cardBackgroundColor = PokemonColorIcon[tipoPrincipal].color

  return (
    <div
      className={style['pokemon-card']}
      data-testid="pokemon-card"
      style={{ backgroundColor: cardBackgroundColor }}
    >
      <div className={style['pokemon-header']}>
        <h2 className={style['pokemon-name']}>
          {capitalizeFirstLetter(pokemon.name)}
        </h2>
        <h2 className={style['pokemon-id']}>
          #{pokemon.id.toString().padStart(3, '0')}
        </h2>
      </div>
      <div className={style['pokemon-content']}>
        <img
          className={style['pokemon-image']}
          src={pokemon.image || DEFAULT_IMAGE_URL}
          alt={pokemon.name}
        />
        <PokemonType pokemon={pokemon} />
        <PokemonMeasures pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
      </div>
    </div>
  )
}
