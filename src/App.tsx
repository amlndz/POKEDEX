import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { pokemonService } from './domain/services/pokemonService'
import { Home } from './components/Home/Home'
import { pokemonAPIRepository } from './infrastructure/api/pokeApi/pokemonDetail/repository/pokemonAPIRepository'

pokemonService.init(pokemonAPIRepository)

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
