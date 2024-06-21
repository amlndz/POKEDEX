import style from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <p className={style['footer-msg']}>
        ©2024 Pokémon. ©1995 - 2024 Nintendo/Creatures Inc./GAME FREAK inc. TM,
        ®Nintendo.
      </p>
    </footer>
  )
}
