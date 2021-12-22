import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Homepage  from './Pages/Homepage';
import Coinpage from './Pages/Coinpage'
import './App.css';
import 'react-alice-carousel/lib/alice-carousel.css';

function App() {
  return (
    <BrowserRouter>
    <div className="coin-app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} exact/>
        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
