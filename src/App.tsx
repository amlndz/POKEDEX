import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { pokemonService } from './domain/services/pokemonService'
import { Home } from './components/Home/Home'
import { pokemonHybridRepository } from './infrastructure/localStorage/repository/pokemonHybridRepository'

pokemonService.init(pokemonHybridRepository)

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
