import { PokemonType } from '../../domain/models/Pokemon'
import { MultiSelect } from 'primereact/multiselect'
import styles from '../Cards/PokemonCard/PokemonCard.module.css' // Importa los estilos de las cards de Pokémon
import { PokemonColorIcon } from '../Cards/PokemonColorIcon'

type FilterSelectorProps = {
  typeFilter: PokemonType[]
  setTypeFilter: (pokemonsType: PokemonType[]) => void
}

type Option = {
  name: PokemonType
  code: string
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({
  typeFilter,
  setTypeFilter,
}) => {
  const options: Option[] = [
    { name: 'grass', code: 'grass' },
    { name: 'bug', code: 'bug' },
    { name: 'electric', code: 'electric' },
    { name: 'ground', code: 'ground' },
    { name: 'fire', code: 'fire' },
    { name: 'fighting', code: 'fighting' },
    { name: 'poison', code: 'poison' },
    { name: 'psychic', code: 'psychic' },
    { name: 'fairy', code: 'fairy' },
    { name: 'dragon', code: 'dragon' },
    { name: 'flying', code: 'flying' },
    { name: 'ghost', code: 'ghost' },
    { name: 'water', code: 'water' },
    { name: 'ice', code: 'ice' },
    { name: 'normal', code: 'normal' },
    { name: 'rock', code: 'rock' },
    { name: 'steel', code: 'steel' },
    { name: 'dark', code: 'dark' },
  ]

  const handleChange = (e: { value: Option[] }) => {
    let selectedTypes = e.value.map(option => option.name)
    if (selectedTypes.length > 2) {
      selectedTypes = selectedTypes.slice(0, 2) // Limita a máximo dos selecciones
    }
    setTypeFilter(selectedTypes)
  }

  const selectedOptions = options.filter(option =>
    typeFilter.includes(option.name),
  )

  return (
    <div className={styles['filter-selector']}>
      {' '}
      {/* Nuevo contenedor para estilos personalizados */}
      <MultiSelect
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        optionLabel="name"
        display="chip"
        placeholder="Select Type"
        maxSelectedLabels={2}
        selectedItemsLabel="selected"
        showSelectAll={false}
        className={styles['pokemon-pills']} // Aplica el estilo de los pills de los tipos de Pokémon
        itemTemplate={(option: Option) => (
          <div
            className={styles['pokemon-type']}
            style={{ backgroundColor: PokemonColorIcon[option.name].color }}
          >
            <img
              src={PokemonColorIcon[option.name].icon}
              className={styles['type-icon']}
            />
            <span>{option.name}</span>
          </div>
        )}
        panelClassName={styles['filter-panel']} // Estilos para el panel desplegable
      />
    </div>
  )
}
