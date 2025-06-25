import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

function Home() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://e-book-reader.onrender.com/api/v1/books/')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          setError('Failed to load books.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load books.');
        setLoading(false);
      });
  }, []);

  // Dynamically get unique categories from books
  const categories = useMemo(() => {
    const set = new Set();
    books.forEach(book => {
      if (book.category) set.add(book.category);
    });
    return ['All Books', ...Array.from(set)];
  }, [books]);

  const booksToShow = showAll ? books : books.slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', background: '#fafbfc', display: 'flex', flexDirection: 'column' }}>
      {/* Header/Navbar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/vite.svg" alt="logo" style={{ width: 32, height: 32 }} />
          <span style={{ fontWeight: 700, fontSize: 20 }}>E-Book Reader</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 20, cursor: 'pointer' }}>��</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#888', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, cursor: 'pointer' }}>
            {'User'[0].toUpperCase()}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ position: 'relative', width: '100%', height: 260, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80" alt="books" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', width: '100%' }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 12, textShadow: '0 2px 8px #222' }}>Dive Into Endless Stories</h1>
          <p style={{ fontSize: 20, marginBottom: 24, textShadow: '0 2px 8px #222' }}>Your next adventure is just a click away. Discover our vast collection.</p>
          <button onClick={() => navigate('/books')} style={{ padding: '12px 32px', borderRadius: 6, background: '#ff6b6b', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #2227' }}>Books</button>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ display: 'flex', flex: 1, padding: '2rem 0', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Sidebar */}
        <aside style={{ width: 200, marginRight: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 18 }}>Categories</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {categories.map(cat => (
              <li key={cat} style={{ marginBottom: 10 }}>
                <button style={{ background: cat === 'All Books' ? '#f5f5f5' : 'none', border: 'none', color: '#222', fontWeight: cat === 'All Books' ? 'bold' : 'normal', padding: '8px 12px', borderRadius: 4, width: '100%', textAlign: 'left', cursor: 'pointer' }}>{cat}</button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Books Section */}
        <section style={{ flex: 1 }}>
          {/* Search Bar */}
          <div style={{ marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Search books, authors, or keywords..."
              style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #ddd', fontSize: 16 }}
            />
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 20 }}>Recommended for You</div>
          {/* Books Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', color: '#888', fontSize: 18 }}>Loading books...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>{error}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24, maxHeight: showAll && books.length > 6 ? 600 : 'none', overflowY: showAll && books.length > 6 ? 'auto' : 'visible' }}>
              {booksToShow.map((book) => (
                <Link key={book._id} to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 320, cursor: 'pointer' }}>
                    <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                    <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{book.title}</div>
                      <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>{book.author}</div>
                      <div style={{ fontSize: 14, color: '#444', flex: 1 }}>{book.category}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button onClick={() => setShowAll(v => !v)} style={{ padding: '12px 32px', borderRadius: 6, background: '#222', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
              {showAll ? 'Show Less' : 'View All Books'}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#181c2a', color: '#fff', padding: '1rem 2rem', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>© 2023 E-Book Reader. All rights reserved.</span>
        <span>Made with <span style={{ color: '#00bfff', fontWeight: 700 }}>Yisily</span></span>
      </footer>
    </div>
  );
}
export default Home;
