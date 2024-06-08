// import { DefaultCard } from './DefaultCard/DefaultCard'
import { ErrorMSG } from './Error/ErrorMSG'
import style from './CardList.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { NotFound } from './NotFound/NotFound'
import { PokemonCard } from './PokemonCard/PokemonCard'
import { DefaultCard } from './DefaultCard/DefaultCard'

type PokedexDTO = {
  name: string
  url: string
}

type PokemonDTO = {
  name: string
  id: number
  image: string
  type: string[]
  weight: number
  height: number
  hp: number
  attack: number
  defense: number
  spattack: number
  spdefense: number
  speed: number
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

export const CardList: React.FC<CardSearchedType> = ({ searched }) => {
  const [pokedex, setPokedex] = useState<PokedexDTO[] | undefined>()
  const [apiError, setApiError] = useState(false)
  const [searchedError, setSearchedError] = useState(false)
  const [loadedResults, setLoadedResults] = useState(false)
  const [pokemons, setPokemons] = useState<PokemonDTO[] | undefined>([])
  const [pokemon, setPokemon] = useState<PokemonDTO>()
  useEffect(() => {
    const fetchPokedex = async () => {
      try {
        const response = await axios.get<RespuestaApiPokedex>(
          'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        )
        response.data.results.map(async pokemon => {
          const response2 = await axios.get<PokemonDTO>(pokemon.url)
        })

        setPokedex(response.data.results)
        console.log(pokemons)
        setApiError(false)
        setLoadedResults(true)
      } catch {
        setApiError(true)
        setPokedex(undefined)
        console.log('[!] - Error en la respuesta de la API')
      }
    }
    fetchPokedex()
  }, [searched])

  return (
    <div className={style['containerCardsList']}>
      {apiError && <ErrorMSG />}
      {!loadedResults && (
        <>
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
          <DefaultCard />
        </>
      )}
      {loadedResults &&
        // pokedex?.map(pokemon => {
        //   if (pokemon.name.includes(searched)) {
        //     searchedError ?? setSearchedError(false)
        //     return (
        //       <PokemonCard
        //         key={pokemon.name}
        //         searched={pokemon.name}
        //         apiError={setApiError}
        //       />
        //     )
        //   }
        // })}
        pokemons.map}
      {searchedError && <NotFound search={searched} />}
    </div>
  )
}
