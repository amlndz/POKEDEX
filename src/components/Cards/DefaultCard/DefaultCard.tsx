import style from './DefaultCard.module.css'

export const DefaultCard = () => {
  return (
    <div className={style['containerDefaultcard']}>
      <img
        src="./assets/pokeballWhite.svg"
        alt="Imagen"
        className={style['imagePokeballDefault']}
      />
    </div>
  )
}
