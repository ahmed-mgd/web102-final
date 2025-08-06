import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
