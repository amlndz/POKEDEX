import style from './DefaultCard.module.css'

export const DefaultCard = () => {
  return (
    <div className={style.containerDefaultcard} data-testid="default-card">
      <img
        src="./assets/pokeballWhite.svg"
        alt="Imagen"
        className={style.imagePokeballDefault}
      />
    </div>
  )
}
