import React from 'react'
import { MultiSelect } from 'primereact/multiselect'
import styles from '../Cards/PokemonCard/PokemonCard.module.css'
import { PokemonType } from '../../domain/models/Pokemon'
import { PokemonColorIcon } from '../Cards/PokemonColorIcon'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

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
    let selectedTypes = e.value ? e.value.map(option => option.name) : []
    if (selectedTypes.length > 2) {
      selectedTypes = selectedTypes.slice(0, 2)
    }
    setTypeFilter(selectedTypes)
  }

  const selectedOptions = options.filter(option =>
    typeFilter.includes(option.name),
  )

  return (
    <div className={styles.multiselect}>
      <MultiSelect
        className={styles.pokemonTypeSelector}
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        optionLabel="name"
        display="chip"
        placeholder="Select Type"
        maxSelectedLabels={2}
        selectedItemsLabel="selected"
        showSelectAll={false}
        itemTemplate={(option: Option) => (
          <div
            className={styles['pokemon-type']}
            style={{ backgroundColor: PokemonColorIcon[option.name].color }}
          >
            <img
              src={PokemonColorIcon[option.name].icon}
              alt={`${option.name} icon`}
              className={styles['type-icon']}
            />
            <span>{option.name}</span>
          </div>
        )}
        selectedItemTemplate={(option: Option) =>
          option ? (
            <div
              className={`${styles['pokemon-type']} ${styles['selected-type']}`}
              style={{ backgroundColor: PokemonColorIcon[option.name].color }}
            >
              <img
                src={PokemonColorIcon[option.name].icon}
                alt={`${option.name} icon`}
                className={styles['type-icon']}
              />
              <span>{option.name}</span>
            </div>
          ) : null
        }
      />
    </div>
  )
}
