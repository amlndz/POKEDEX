import { PokemonColorIcono } from '../PokemonColorIcono'
import { Pokemon } from '../PokemonType'
import { PokemonStats } from './PokemonStats'
import style from './PokemonCard.module.css'
type PokemonCardProps = {
  pokemon: Pokemon
}

const DEFAULT_IMAGE_URL = './assets/pokeballDefault.png'

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const tipoPrincipal = pokemon.type[0]
  const cardBackgroundColor = PokemonColorIcono[tipoPrincipal].color

  return (
    <div
      className={style['pokemon-card']}
      data-testid="pokemon-card"
      style={{ backgroundColor: cardBackgroundColor }}
    >
      <div className={style['pokemon-header']}>
        <h2 className={style['pokemon-name']}>{pokemon.name}</h2>
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
        <div className={style['pokemon-pills']}>
          {pokemon.type.map(type => {
            const pokemonColorIcono = PokemonColorIcono[type]
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
        <PokemonStats pokemon={pokemon} />
      </div>
    </div>
  )
}
