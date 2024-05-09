import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Landing } from './components/Landing'
import { Ludo } from './components/Ludo';
import LudoBoard from './components/Temp';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path='/ludo' element={<Ludo/>} />
        <Route path='/temp' element={<LudoBoard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
