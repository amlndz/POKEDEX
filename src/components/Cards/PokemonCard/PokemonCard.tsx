import { useEffect, useState } from 'react'
import axios from 'axios'

type PropType = {
  searched: string
  apiError: (state: boolean) => void
}

type PokemonDTO = {}

export const PokemonCard: React.FC<PropType> = ({ searched, apiError }) => {
  const [pokemon, setPokemon] = useState<PokemonDTO | undefined>()
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get<PokemonDTO>(
          `https://pokeapi.co/api/v2/pokemon/${searched}`,
        )
        console.log(response.data)
        setPokemon(response.data)
        apiError(false)
      } catch {
        console.log('[!] - Error en la respuesta de la API')
        apiError(true)
      }
    }
    fetchPokemons()
  }, [searched])

  return <>{pokemon && <p>SEARCHED: {searched}</p>}</>
}
