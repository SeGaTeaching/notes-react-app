import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/About';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import './App.css';

function App() {

  return (
    <div className='container'>
      <div className="header">
        <Navigation />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/notes' element={<NotesList />} />
        <Route path='/notes/:id' element={<NoteDetail />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
      <footer className="footer">© 2025</footer>
    </div>
  )
}

export default App
