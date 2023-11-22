import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import InfoPosts from './components/InfoPost/InfoPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/infoPost" element={<InfoPosts />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
