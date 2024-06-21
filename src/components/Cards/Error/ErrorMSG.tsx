import style from './ErrorMSG.module.css'

export const ErrorMSG = () => {
  return (
    <div className={style.containerError}>
      <img
        className={style.imagenError}
        src="./assets/alert.svg"
        alt="Imagen de error"
      />
      <p className={style.textoError}>An error ocurred getting Pokémons.</p>
      <p className={style.textoError}>Please, try it later</p>
    </div>
  )
}
