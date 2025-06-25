import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookList from './components/Books/BookList';
import BookmarkList from './components/Users/BookmarkList';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import BookDetails from './components/Books/BookDetails';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
        <Link to="/">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/books">Books</Link> |{' '}
        <Link to="/bookmarks">Bookmarks</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/bookmarks" element={<BookmarkList />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App; 