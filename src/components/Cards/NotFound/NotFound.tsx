import style from './NotFound.module.css'

export const NotFound = () => {
  return (
    <div className={style['containerNotFound']}>
      <img
        className={style['imagenNotFound']}
        src="./assets/PokeNot.svg"
        alt="Imagen de error"
      />
      <p className={style['textoNotFound']}>There is not results for "....".</p>
    </div>
  )
}
