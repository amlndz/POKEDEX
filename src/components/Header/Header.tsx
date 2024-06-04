import style from './Header.module.css'

export const Header = () => {
  return (
    <header className={style['header']}>
      <div className={style['components']}>
        <img
          src="./assets/pokeball.svg"
          alt="Imagen pokeball"
          className={style['imagen-pokeball']}
        />
        <h1 className={style['header-title']}>Pokédex</h1>{' '}
      </div>
    </header>
  )
}
