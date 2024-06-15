import style from '../PokemonCard.module.css'
import { Pokemon } from '../../../../domain/models/Pokemon'
import { PokemonColorIcon } from '../../PokemonColorIcon'

type PokemonTypeProps = {
  pokemon: Pokemon
}

export const PokemonType: React.FC<PokemonTypeProps> = ({ pokemon }) => {
  return (
    <div className={style['pokemon-pills']}>
      {pokemon.type.map(type => {
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
            <p>{type}</p>
          </div>
        )
      })}
    </div>
  )
}
