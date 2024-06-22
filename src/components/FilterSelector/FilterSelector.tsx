import { PokemonType } from '../../domain/models/Pokemon'
import { MultiSelect } from 'primereact/multiselect'

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
      selectedTypes.slice()
    }
    setTypeFilter(selectedTypes)
  }

  return (
    <div>
      <MultiSelect
        value={options.filter(option => typeFilter.includes(option.name))}
        onChange={handleChange}
        options={options}
        optionLabel="name"
        display="chip"
        placeholder="Select Type"
        maxSelectedLabels={2}
        selectedItemsLabel="selected"
        showSelectAll={false}
      />
    </div>
  )
}
