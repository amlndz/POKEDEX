import styles from './Form.module.css'

export const Form = () => {
  return (
    <form className={styles['form']}>
      <label htmlFor="inputPokemonName" className={styles['labelInput']}>
        <img
          src="./assets/lupa.svg"
          alt="Lupa buscar pokemon"
          className={styles['lupaBuscarNombre']}
        />
      </label>
      <input
        type="text"
        id="inputPokemonName"
        className={styles['inputNombre']}
      />
    </form>
  )
}
