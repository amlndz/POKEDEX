// import { DefaultCard } from './DefaultCard/DefaultCard'
import { ErrorMSG } from './Error/ErrorMSG'
// import { NotFound } from './NotFound/NotFound'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotFound } from './NotFound/NotFound'
// import { ErrorMSG } from './Error/ErrorMSG'

type PokedexDTO = {
  name: string
  // url: string
}

type RespuestaApiPokedex = {
  count: number
  next: string | null
  previous: string | null
  results: PokedexDTO[]
}

type CardSearchedType = {
  searched: string
}

type PokemonDTO = {
  name: string
}

export const CardList: React.FC<CardSearchedType> = ({ searched }) => {
  const [pokedex, setPokedex] = useState<PokedexDTO[] | undefined>()
  const [pokemon, setPokemon] = useState<PokemonDTO | undefined>()
  const [pokemons, setPokemons] = useState<PokemonDTO[] | undefined>()
  const [apiError, setApiError] = useState(false)
  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const response = await axios.get<RespuestaApiPokedex>(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        )
        setPokedex(response.data.results)
        setApiError(false)
      } catch {
        setApiError(true)
        setPokedex(undefined)
        console.log('[!] - Error en la respuesta de la API')
      }
    }
    fetchPokedex()
  }, [])

  useEffect(() => {
    console.log('[+] Searched: ' + searched)
    const fetchPokemons = async () => {
      try {
        pokedex?.forEach(async pokemon => {
          if (pokemon.name.includes(searched)) {
            console.log('DENTRO')
            const response = await axios.get<PokemonDTO>(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
            )
            // console.log(response.data)
            setPokemon(response.data)
          }
        })
        console.log(pokemon)

        setApiError(false)
      } catch {
        setApiError(true)
        setPokedex(undefined)
        setPokemons(undefined)
        console.log('[!] - Error en la respuesta de la API')
      }
    }
    fetchPokemons()
  }, [searched])

  return (
    <div className={style['containerCardsList']}>
      {apiError && <ErrorMSG />}

      {pokemons &&
        pokemons.map((pokemon, index) => <p key={index}>{pokemon.name}</p>)}
      {/* <DefaultCard /> */}
      {!pokemons && <NotFound search={searched} />}
    </div>
  )
}
