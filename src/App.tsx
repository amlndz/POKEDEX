import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Form } from './components/Form/Form'
import { CardList } from './components/Cards/CardsList'
import { useState } from 'react'

function App() {
  const [searchedPokemon, setSearchedPokemon] = useState('')
  console.log(searchedPokemon)
  return (
    <>
      <Header />
      <main>
        <Form onChange={setSearchedPokemon} />
        <CardList />
      </main>
      <Footer />
    </>
  )
}

export default App
