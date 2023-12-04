import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import InfoPosts from './components/InfoPost/InfoPost';
import Home from './components/Home/Post';
import PostForm from './components/Home/PostForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/infoPost" element={<InfoPosts />} />
        <Route path="/home" element={<Home />} />
        <Route path="/postForm" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
