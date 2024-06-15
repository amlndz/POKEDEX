import style from '../PokemonCard.module.css'
import { Pokemon } from '../../../../domain/models/Pokemon'

type PokemonStatsProps = {
  pokemon: Pokemon
}

export const PokemonMeasures: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  return (
    <div className={style['pokemon-measures']}>
      <p>
        <img
          className={style['measures-weight']}
          src="./assets/Weight.svg"
          alt="Weight icon"
        />
        {pokemon.weight} kg
      </p>
      <img
        className={style['measures-separator']}
        src="./assets/Separator.svg"
        alt="Separator"
      ></img>
      <p>
        <img
          className={style['measures-height']}
          src="./assets/Ruler.svg"
          alt="Height icon"
        />
        {pokemon.height} m
      </p>
    </div>
  )
}
