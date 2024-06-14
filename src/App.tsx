import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { SearchedBox } from './components/SearchedBox/SearchedBox'
import { CardList } from './components/Cards/CardsList'
import { useState } from 'react'

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
