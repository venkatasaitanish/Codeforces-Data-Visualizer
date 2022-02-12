import './App.css';
import Header from './components/Header/Header';
import SingleUser from './pages/SingleUser';
import Compare from './pages/Compare';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SingleUser />}/>
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
