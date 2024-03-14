import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing_page from './components/Landing_page';
import Project_states from './context/Project_states';

function App() {
  return (
    <>
  <Project_states>
 <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Landing_page />} />  
    </Routes>
    </BrowserRouter>
    </Project_states>
    </>
  );
}

export default App;
