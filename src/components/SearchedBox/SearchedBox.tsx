import styles from './SearchedBox.module.css'

type SearchedBoxProps = {
  onChange: (searched: string) => void
}

export const SearchedBox: React.FC<SearchedBoxProps> = ({ onChange }) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="inputPokemonName" className={styles.labelInput}>
        <img
          src="./assets/lupa.svg"
          alt="Lupa buscar pokemon"
          className={styles.lupaBuscarNombre}
        />
      </label>
      <input
        type="text"
        id="inputPokemonName"
        className={styles.inputNombre}
        placeholder="Search a Pokemon..."
        onChange={event => {
          onChange(event.target.value.trim())
        }}
      />
    </form>
  )
}
