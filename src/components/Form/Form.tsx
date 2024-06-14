import styles from './Form.module.css'

type FormProps = {
  onChange: (searched: string) => void
}

export const Form: React.FC<FormProps> = ({ onChange }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
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
        placeholder="Search a Pokemon..."
        onChange={event => {
          onChange(event.target.value)
        }}
      />
    </form>
  )
}
