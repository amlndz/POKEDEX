import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { SearchedBox } from './components/SearchedBox/SearchedBox'
import { CardList } from './components/Cards/CardsList'
import { useState } from 'react'
import { pokemonService } from './domain/services/pokemonService'
import { pokemonAPIRepository } from './infrastructure/api/pokeApi/pokemonDetail/repository/pokemonAPIRepository'

pokemonService.init(pokemonAPIRepository)

function App() {
  const [searched, setSearched] = useState('')
  return (
    <>
      <Header />
      <main>
        <SearchedBox onChange={setSearched} />
        <CardList searched={searched} />
      </main>
      <Footer />
    </>
  )
}

export default App
