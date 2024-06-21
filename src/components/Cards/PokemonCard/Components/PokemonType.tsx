import style from '../PokemonCard.module.css'
import { Pokemon } from '../../../../domain/models/Pokemon'
import { PokemonColorIcon } from '../../PokemonColorIcon'

type PokemonTypeProps = {
  pokemon: Pokemon
}

export const PokemonType: React.FC<PokemonTypeProps> = ({ pokemon }) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className={style['pokemon-pills']}>
      {pokemon.types.map(type => {
        const pokemonColorIcono = PokemonColorIcon[type]
        return (
          <div
            key={type}
            className={style['pokemon-type']}
            style={{
              backgroundColor: pokemonColorIcono.color,
            }}
          >
            <img
              src={pokemonColorIcono.icon}
              alt={`${type} icon`}
              className={style['type-icon']}
            />
            <p>{capitalizeFirstLetter(type)}</p>
          </div>
        )
      })}
    </div>
  )
}
