import React, { useEffect, useState } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import styles from '../Cards/PokemonCard/PokemonCard.module.css'
import { GENERATIONS, Generation } from '../../domain/models/Generacion'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

type GenSelectorProps = {
  genFilter: Generation[]
  onGenSelected: (generations: Generation[]) => void
}

type Option = {
  name: Generation
  code: string
}

export const GenSelector: React.FC<GenSelectorProps> = ({
  genFilter,
  onGenSelected,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

  const options: Option[] = GENERATIONS.map(gen => ({ name: gen, code: gen }))

  useEffect(() => {
    if (genFilter.length === 0) {
      onGenSelected(['Kanto'])
    } else {
      const initialSelection = options.filter(option =>
        genFilter.includes(option.name),
      )
      setSelectedOptions(initialSelection)
    }
  }, [genFilter])

  const handleChange = (e: { value: Option[] }) => {
    let selectedGens = e.value ? e.value.map(option => option.name) : []
    setSelectedOptions(e.value)
    onGenSelected(selectedGens)
  }

  return (
    <div className={styles.multiselect}>
      <MultiSelect
        className={styles.pokemonGenSelector}
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        optionLabel="name"
        display="chip"
        placeholder="Select Generation"
        maxSelectedLabels={2}
        selectedItemsLabel="selected"
        showSelectAll={false}
        itemTemplate={(option: Option) => (
          <div className={styles['pokemon-gen']}>
            <span>{option.name}</span>
          </div>
        )}
      />
    </div>
  )
}
