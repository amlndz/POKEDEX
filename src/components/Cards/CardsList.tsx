// import { DefaultCard } from './DefaultCard/DefaultCard'
import { ErrorMSG } from './Error/ErrorMSG'
// import { NotFound } from './NotFound/NotFound'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { ErrorMSG } from './Error/ErrorMSG'

type PokedexDTO = {
  name: string
  url: string
}

type RespuestaApi = {
  count: number
  next: string | null
  previous: string | null
  results: PokedexDTO[]
}
export const CardList = () => {
  const [pokedex, setPokedex] = useState<PokedexDTO[] | undefined>()
  const [apiError, setApiError] = useState(false)
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get<RespuestaApi>(
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
    fetchPokemons()
  }, [])

  useEffect(() => {})
  return (
    <div className={style['containerCardsList']}>
      {apiError && <ErrorMSG />}

      {pokedex &&
        pokedex.map((pokemon, index) => <p key={index}>{pokemon.name}</p>)}
      {/* <DefaultCard /> */}
    </div>
  )
}
