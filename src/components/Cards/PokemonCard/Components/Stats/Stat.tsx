import style from '../../PokemonCard.module.css'

type PokemonStatsProps = {
  nameStat: string
  pokemonStat: number
}

export const Stat: React.FC<PokemonStatsProps> = ({
  nameStat,
  pokemonStat,
}) => {
  const formatearStat = (stat: number) =>
    stat < 100 ? `0${stat}` : stat.toString()

  return (
    <li>
      <div className={style['pokemon-stat']}>
        <p>{nameStat}</p> <span>{formatearStat(pokemonStat)}</span>
      </div>
      <progress max={255} value={pokemonStat}></progress>
    </li>
  )
}
