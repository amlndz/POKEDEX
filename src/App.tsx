import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Form } from './components/Form/Form'
import { CardList } from './components/Cards/CardsList'

function App() {
  return (
    <>
      <Header />
      <main>
        <Form />
        <CardList />
      </main>
      <Footer />
    </>
  )
}

export default App
