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
      <img
        className={style['pokemon-image']}
        src={pokemon.image || DEFAULT_IMAGE_URL}
        alt={pokemon.name}
      />
      <div className={style['pokemon-content']}>
        <div className={style['pokemon-pills']}>
          <p>
            {/* <img src="" alt="imagen tipo 1" /> */}
            {pokemon.type[0]}
          </p>
          <p>
            {/* <img src="" alt="imagen tipo 2" /> */}
            {pokemon?.type[1]}
          </p>
        </div>
        <div className={style['pokemon-measures']}>
          <p>
            <img src="" />
            {pokemon.weight}
          </p>
          <p>
            <img src="" /> {pokemon.height}
          </p>
        </div>
        <div className={style['pokemon-stats']}>
          <p>
            HP <span>{pokemon.stats.hp}</span>
            <span>
              <progress max={255} value={pokemon.stats.hp}></progress>
            </span>
          </p>

          <p>
            ATK <span>{pokemon.stats.attack}</span>
            <span>
              <progress max={255} value={pokemon.stats.attack}></progress>
            </span>
          </p>

          <p>
            DEF <span>{pokemon.stats.defense}</span>
            <span>
              <progress max={255} value={pokemon.stats.defense}></progress>
            </span>
          </p>

          <p>
            SAT <span>{pokemon.stats.spattack}</span>
            <progress max={255} value={pokemon.stats.spattack}></progress>
          </p>

          <p>
            SDF <span>{pokemon.stats.spdefense}</span>
            <span>
              <progress max={255} value={pokemon.stats.spdefense}></progress>
            </span>
          </p>

          <p>
            SPD <span>{pokemon.stats.speed}</span>
            <span>
              <progress max={255} value={pokemon.stats.speed}></progress>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
