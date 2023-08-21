import './App.css'
import Header from './components/Header'
import Search from './components/Search'
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <main style={{ display:'flex', flexDirection:'column' }}>
      <Header />
      <Search />
      <Footer />
    </main>
  )
}

export default App
