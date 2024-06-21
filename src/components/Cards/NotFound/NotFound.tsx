import style from './NotFound.module.css'

type PropType = {
  search: string
}

export const NotFound: React.FC<PropType> = ({ search }) => {
  return (
    <div className={style.containerNotFound}>
      <img
        className={style.imagenNotFound}
        src="./assets/PokeNot.svg"
        alt="Imagen de error"
      />
      <p className={style.textoNotFound}>
        There is not results for "{search}".
      </p>
    </div>
  )
}
