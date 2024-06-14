import style from '../PokemonCard.module.css'
import { Pokemon } from '../../PokemonType'

type PokemonStatsProps = {
  pokemon: Pokemon
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  const formatearStat = (stat: number) =>
    stat < 100 ? `0${stat}` : stat.toString()

  return (
    <ul className={style['pokemon-stats']}>
      <li>
        <div className={style['pokemon-stat']}>
          <p>HP</p> <span>{formatearStat(pokemon.stats.hp)}</span>
        </div>
        <progress max={255} value={pokemon.stats.hp}></progress>
      </li>
      <li>
        <div className={style['pokemon-stat']}>
          <p>ATK</p> <span>{formatearStat(pokemon.stats.attack)}</span>
        </div>
        <progress max={255} value={pokemon.stats.attack}></progress>
      </li>
      <li>
        <div className={style['pokemon-stat']}>
          <p>DEF</p> <span>{formatearStat(pokemon.stats.defense)}</span>
        </div>
        <progress max={255} value={pokemon.stats.defense}></progress>
      </li>
      <li>
        <div className={style['pokemon-stat']}>
          <p>SAT</p> <span>{formatearStat(pokemon.stats.spattack)}</span>
        </div>
        <progress max={255} value={pokemon.stats.spattack}></progress>
      </li>
      <li>
        <div className={style['pokemon-stat']}>
          <p>SDF</p> <span>{formatearStat(pokemon.stats.spdefense)}</span>
        </div>
        <progress max={255} value={pokemon.stats.spdefense}></progress>
      </li>
      <li>
        <div className={style['pokemon-stat']}>
          <p>SPD</p> <span>{formatearStat(pokemon.stats.speed)}</span>
        </div>
        <progress max={255} value={pokemon.stats.speed}></progress>
      </li>
    </ul>
  )
}
