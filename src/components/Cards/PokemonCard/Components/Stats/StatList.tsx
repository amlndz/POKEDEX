import style from '../../PokemonCard.module.css'
import { Pokemon } from '../../../../../domain/models/Pokemon'
import { Stat } from './Stat'

type PokemonStatsProps = {
  pokemon: Pokemon
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  return (
    <ul className={style['pokemon-stats']}>
      <Stat nameStat="HP" pokemonStat={pokemon.stats.hp} />
      <Stat nameStat="ATK" pokemonStat={pokemon.stats.attack} />
      <Stat nameStat="DEF" pokemonStat={pokemon.stats.defense} />
      <Stat nameStat="SAT" pokemonStat={pokemon.stats.spattack} />
      <Stat nameStat="SDF" pokemonStat={pokemon.stats.spdefense} />
      <Stat nameStat="SPD" pokemonStat={pokemon.stats.speed} />
    </ul>
  )
}
