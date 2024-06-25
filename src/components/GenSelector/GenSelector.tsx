import { GENERATIONS, Generation } from '../../domain/models/Generacion'
import styles from '../Cards/PokemonCard/PokemonCard.module.css'
import React from 'react'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
type GenSelectorProp = {
  onGenSelected: (pokemonsGen: Generation) => void
}

export const GenSelector: React.FC<GenSelectorProp> = ({ onGenSelected }) => {
  return <></>
}
