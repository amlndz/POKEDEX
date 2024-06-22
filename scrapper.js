import axios from 'axios'
import fs from 'fs'

const response = await axios.get(
  'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
)
const mapPoke = pokemon => ({
  name: pokemon.name,
  url: `pokemon/${pokemon.name}`,
})
console.log(response.data)
const data = JSON.stringify(response.data.results)
fs.writeFileSync('pokemonData.json', data)
