import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import AddPost from './components/AddPost';
import All from './components/All';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
//for tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProvider from './context/UserProvider';
import CategoryProvider from './context/CategoryProvider';
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/all" element={<All/>}></Route>
        <Route path="/post/:id" element={<PostPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
      <CategoryProvider>
        <Routes>
    <Route path="/addPost" element={<AddPost/>}></Route>
    <Route path="/edit/:id" element={<EditPostPage/>}></Route>
    </Routes>
    </CategoryProvider>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
