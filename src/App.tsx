import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Form } from './components/Form/Form'
import { CardList } from './components/Cards/CardsList'
import { useState } from 'react'

function App() {
  const [searched, setSearched] = useState('')
  console.log(searched)
  return (
    <>
      <Header />
      <main>
        <Form onChange={setSearched} />
        <CardList searched={searched} />
      </main>
      <Footer />
    </>
  )
}

export default App
