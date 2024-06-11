import { Pokemon } from '../PokemonType'
import style from './PokemonCard.module.css'

type PokemonCardProps = {
  pokemon: Pokemon
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className={style['pokemon-card']} data-testid="pokemon-card">
      <div className={style['pokemon-header']}>
        <h2>{pokemon.name}</h2>
        <h2>#{pokemon.id.toString().padStart(3, '0')}</h2>
      </div>
      <div className={style['pokemon-content']}>
        <img
          className={style['pokemon-image']}
          src={pokemon.image || DEFAULT_IMAGE_URL}
          alt={pokemon.name}
        />
        <div className={style['pokemon-pills']}>
          <p>{pokemon.type[0]}</p>
          {pokemon.type[1] && <p>{pokemon.type[1]}</p>}
        </div>
        <div className={style['pokemon-measures']}>
          <p>
            <img src="./assets/Weight.svg" alt="Weight icon" />
            {pokemon.weight} kg
          </p>
          <p>
            <img src="./assets/Ruler.svg" alt="Height icon" />
            {pokemon.height} m
          </p>
        </div>
        <ul className={style['pokemon-stats']}>
          <li>
            <div className={style['pokemon-stat']}>
              <p>HP</p> <span>{pokemon.stats.hp}</span>
            </div>
            <progress max={255} value={pokemon.stats.hp}></progress>
          </li>
          <li>
            <div className={style['pokemon-stat']}>
              <p>ATK</p> <span>{pokemon.stats.attack}</span>
            </div>
            <progress max={255} value={pokemon.stats.attack}></progress>
          </li>
          <li>
            <div className={style['pokemon-stat']}>
              <p>DEF</p> <span>{pokemon.stats.defense}</span>
            </div>
            <progress max={255} value={pokemon.stats.defense}></progress>
          </li>
          <li>
            <div className={style['pokemon-stat']}>
              <p>SAT</p> <span>{pokemon.stats.spattack}</span>
            </div>
            <progress max={255} value={pokemon.stats.spattack}></progress>
          </li>
          <li>
            <div className={style['pokemon-stat']}>
              <p>SDF</p> <span>{pokemon.stats.spdefense}</span>
            </div>
            <progress max={255} value={pokemon.stats.spdefense}></progress>
          </li>
          <li>
            <div className={style['pokemon-stat']}>
              <p>SPD</p> <span>{pokemon.stats.speed}</span>
            </div>
            <progress max={255} value={pokemon.stats.speed}></progress>
          </li>
        </ul>
      </div>
    </div>
  )
}
