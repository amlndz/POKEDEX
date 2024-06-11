import { Pokemon } from '../PokemonType'
import style from './PokemonCard.module.css'

type PokemonCardProps = {
  pokemon: Pokemon
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className={style['pokemon-card']}>
      <div className={style['pokemon-header']}>
        <h2>{pokemon.name}</h2>
        <h2>{pokemon.id}</h2>
      </div>
      <div className={style['pokemon-content']}>
        <img
          className={style['pokemon-image']}
          src={pokemon.image || DEFAULT_IMAGE_URL}
          alt={pokemon.name}
        />
        <div className={style['pokemon-pills']}>
          <p>
            {/* <img src="" alt="imagen tipo 1" /> */}
            {pokemon.type[0]}
          </p>
          <p>
            {/* <img src="" alt="imagen tipo 2" /> */}
            {pokemon.type[1]}
          </p>
        </div>
        <div className={style['pokemon-measures']}>
          <p>
            <img src="./assets/Weight.svg" />
            {pokemon.weight}
          </p>
          <p>
            <img src="./assets/Ruler.svg" alt="Icono regla" />
            {pokemon.height}
          </p>
        </div>
        <ul className={style['pokemon-stats']}>
          <li>
            <div className={style['pokemon-stat']}>
              <p>HP</p> <span>{pokemon.stats.hp}</span>
            </div>
            <progress max={255} value={pokemon.stats.hp}></progress>
          </li>

          <p>
            ATK <span>{pokemon.stats.attack}</span>
            <progress max={255} value={pokemon.stats.attack}></progress>
          </p>

          <p>
            DEF <span>{pokemon.stats.defense}</span>
            <progress max={255} value={pokemon.stats.defense}></progress>
          </p>

          <p>
            SAT <span>{pokemon.stats.spattack}</span>
            <progress max={255} value={pokemon.stats.spattack}></progress>
          </p>

          <p>
            SDF <span>{pokemon.stats.spdefense}</span>
            <progress max={255} value={pokemon.stats.spdefense}></progress>
          </p>

          <p>
            SPD <span>{pokemon.stats.speed}</span>
            <progress max={255} value={pokemon.stats.speed}></progress>
          </p>
        </ul>
      </div>
    </div>
  )
}
