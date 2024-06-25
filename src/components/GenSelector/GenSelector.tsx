import { Generation } from '../../domain/models/Generacion'

import React from 'react'
import { MultiSelect } from 'primereact/multiselect'
import styles from '../Cards/PokemonCard/PokemonCard.module.css'
import { PokemonColorIcon } from '../Cards/PokemonColorIcon'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
type GenSelectorProp = {
  setGenFilter: (pokemonsGen: Generation) => void
}

export const GenSelector: React.FC<GenSelectorProp> = ({ setGenFilter }) => {
  return <></>
}

//   const selectedOptions = options.filter(option =>
//     typeFilter.includes(option.name),
//   )

//   return (
//     <div className={styles.multiselect}>
//       <MultiSelect
//         className={styles.pokemonTypeSelector}
//         value={selectedOptions}
//         onChange={handleChange}
//         options={options}
//         optionLabel="name"
//         display="chip"
//         placeholder="Select Type"
//         maxSelectedLabels={2}
//         selectedItemsLabel="selected"
//         showSelectAll={false}
//         itemTemplate={(option: Option) => (
//           <div
//             className={styles['pokemon-type']}
//             style={{ backgroundColor: PokemonColorIcon[option.name].color }}
//           >
//             <img
//               src={PokemonColorIcon[option.name].icon}
//               alt={`${option.name} icon`}
//               className={styles['type-icon']}
//             />
//             <span>{option.name}</span>
//           </div>
//         )}
//         selectedItemTemplate={(option: Option) =>
//           option ? (
//             <div
//               className={`${styles['pokemon-type']} ${styles['selected-type']}`}
//               style={{ backgroundColor: PokemonColorIcon[option.name].color }}
//             >
//               <img
//                 src={PokemonColorIcon[option.name].icon}
//                 alt={`${option.name} icon`}
//                 className={styles['type-icon']}
//               />
//               <span>{option.name}</span>
//             </div>
//           ) : null
//         }
//       />
//     </div>
//   )
// }
