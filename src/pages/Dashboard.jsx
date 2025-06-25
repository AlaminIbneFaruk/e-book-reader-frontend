import { useState, useEffect } from 'react';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookSearch, setBookSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorBooks, setErrorBooks] = useState('');
  const [errorUsers, setErrorUsers] = useState('');

  // Modal state for adding a book
  const [showAddBook, setShowAddBook] = useState(false);
  const [addBookLoading, setAddBookLoading] = useState(false);
  const [addBookError, setAddBookError] = useState('');
  const [addBookForm, setAddBookForm] = useState({
    title: '',
    author: '',
    category: '',
    coverImage: '',
    pdfUrl: '',
  });

  // Modal state for adding a user
  const [showAddUser, setShowAddUser] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState('');
  const [addUserForm, setAddUserForm] = useState({
    name: '',
    email: '',
    role: '',
    avatar: '',
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  function fetchBooks() {
    setLoadingBooks(true);
    fetch('https://e-book-reader.onrender.com/api/v1/books/')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          setErrorBooks('Failed to load books.');
        }
        setLoadingBooks(false);
      })
      .catch(() => {
        setErrorBooks('Failed to load books.');
        setLoadingBooks(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setLoadingUsers(true);
    fetch('https://e-book-reader.onrender.com/api/v1/users/')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          setErrorUsers('Failed to load users.');
        }
        setLoadingUsers(false);
      })
      .catch(() => {
        setErrorUsers('Failed to load users.');
        setLoadingUsers(false);
      });
  }

  const filteredBooks = books.filter(
    b =>
      b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(bookSearch.toLowerCase())
  );
  const filteredUsers = users.filter(
    u =>
      (u.name && u.name.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase()))
  );

  // Add Book Handlers
  function handleAddBookChange(e) {
    setAddBookForm({ ...addBookForm, [e.target.name]: e.target.value });
  }

  function handleAddBookSubmit(e) {
    e.preventDefault();
    setAddBookLoading(true);
    setAddBookError('');
    fetch('https://e-book-reader.onrender.com/api/v1/books/create-book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addBookForm),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowAddBook(false);
          setAddBookForm({ title: '', author: '', category: '', coverImage: '', pdfUrl: '' });
          fetchBooks();
        } else {
          setAddBookError(data.message || 'Failed to add book.');
        }
        setAddBookLoading(false);
      })
      .catch(() => {
        setAddBookError('Failed to add book.');
        setAddBookLoading(false);
      });
  }

  // Add User Handlers
  function handleAddUserChange(e) {
    setAddUserForm({ ...addUserForm, [e.target.name]: e.target.value });
  }

  function handleAddUserSubmit(e) {
    e.preventDefault();
    setAddUserLoading(true);
    setAddUserError('');
    fetch('https://e-book-reader.onrender.com/api/v1/users/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addUserForm),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowAddUser(false);
          setAddUserForm({ name: '', email: '', role: '', avatar: '' });
          fetchUsers();
        } else {
          setAddUserError(data.message || 'Failed to add user.');
        }
        setAddUserLoading(false);
      })
      .catch(() => {
        setAddUserError('Failed to add user.');
        setAddUserLoading(false);
      });
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: 72, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px 0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/vite.svg" alt="logo" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: 700, fontSize: 22, color: '#222' }}>Admin Panel</span>
        </div>

      </header>

      {/* Add Book Modal */}
      {showAddBook && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddBookSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 32px #0003', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
            <button type="button" onClick={() => setShowAddBook(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>×</button>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Add New Book</div>
            <input name="title" value={addBookForm.title} onChange={handleAddBookChange} placeholder="Title" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="author" value={addBookForm.author} onChange={handleAddBookChange} placeholder="Author" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="category" value={addBookForm.category} onChange={handleAddBookChange} placeholder="Category" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="coverImage" value={addBookForm.coverImage} onChange={handleAddBookChange} placeholder="Cover Image URL" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="pdfUrl" value={addBookForm.pdfUrl} onChange={handleAddBookChange} placeholder="PDF URL" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            {addBookError && <div style={{ color: 'red', fontSize: 14 }}>{addBookError}</div>}
            <button type="submit" disabled={addBookLoading} style={{ padding: '10px 0', borderRadius: 6, background: '#222', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: addBookLoading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {addBookLoading ? 'Adding...' : 'Add Book'}
            </button>
          </form>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddUserSubmit} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 4px 32px #0003', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
            <button type="button" onClick={() => setShowAddUser(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>×</button>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Add New User</div>
            <input name="name" value={addUserForm.name} onChange={handleAddUserChange} placeholder="Name" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="email" value={addUserForm.email} onChange={handleAddUserChange} placeholder="Email" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="role" value={addUserForm.role} onChange={handleAddUserChange} placeholder="Role (e.g. User, Admin)" required style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            <input name="avatar" value={addUserForm.avatar} onChange={handleAddUserChange} placeholder="Avatar URL" style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 15 }} />
            {addUserError && <div style={{ color: 'red', fontSize: 14 }}>{addUserError}</div>}
            <button type="submit" disabled={addUserLoading} style={{ padding: '10px 0', borderRadius: 6, background: '#222', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: addUserLoading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
              {addUserLoading ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </div>
      )}

      {/* Main Panel */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px #0002', padding: 40, width: 1400, minHeight: 800, display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          {/* Book Management */}
          <section style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Book Management</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 8 }}>
              <input
                type="text"
                placeholder="Search books by title, author, or category..."
                value={bookSearch}
                onChange={e => setBookSearch(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background: '#fafbfc' }}
              />
              <button onClick={() => setShowAddBook(true)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, width: 36, height: 36, fontSize: 20, cursor: 'pointer' }}>+</button>
            </div>
            <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              {loadingBooks ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>Loading books...</div>
              ) : errorBooks ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>{errorBooks}</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fafbfc', fontWeight: 700, color: '#222', fontSize: 15 }}>
                      <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 700 }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 700 }}>Author</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 700 }}>Category</th>
                      <th style={{ textAlign: 'center', padding: '12px 8px', fontWeight: 700 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.map((book, i) => (
                      <tr key={book._id || i} style={{ borderBottom: '1px solid #f0f0f0', fontSize: 15 }}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px' }}>
                          <img src={book.coverImage} alt={book.title} style={{ width: 36, height: 52, objectFit: 'cover', borderRadius: 4, boxShadow: '0 2px 8px #0001' }} />
                          <span style={{ fontWeight: 600 }}>{book.title}</span>
                        </td>
                        <td style={{ padding: '10px 8px', color: '#444' }}>{book.author}</td>
                        <td style={{ padding: '10px 8px', color: '#444' }}>{book.category}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                          <button title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginRight: 8 }}>✏️</button>
                          <button title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginRight: 8 }}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* User Management */}
          <section style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>User Management</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 8 }}>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, background: '#fafbfc' }}
              />
              <button onClick={() => setShowAddUser(true)} style={{ background: '#f5f5f5', border: 'none', borderRadius: 8, width: 36, height: 36, fontSize: 20, cursor: 'pointer' }}>+</button>
            </div>
            <div style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
              {loadingUsers ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>Loading users...</div>
              ) : errorUsers ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>{errorUsers}</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#fafbfc', fontWeight: 700, color: '#222', fontSize: 15 }}>
                      <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 700 }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 700 }}>Email</th>
                      <th style={{ textAlign: 'center', padding: '12px 8px', fontWeight: 700 }}>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, i) => (
                      <tr key={user._id || i} style={{ borderBottom: '1px solid #f0f0f0', fontSize: 15 }}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px' }}>
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name || user.email} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 8px #0001' }} />
                          ) : (
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#888', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, boxShadow: '0 2px 8px #0001' }}>
                              {(user.name || user.email || '?')[0].toUpperCase()}
                            </div>
                          )}
                          <span style={{ fontWeight: 600 }}>{user.name || user.email}</span>
                        </td>
                        <td style={{ padding: '10px 8px', color: '#444' }}>{user.email}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                          {user.role === 'Admin' ? (
                            <span style={{ background: '#222', color: '#fff', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 14 }}>Admin</span>
                          ) : (
                            <span style={{ background: '#f5f5f5', color: '#222', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 14 }}>{user.role || 'User'}</span>
                          )}
                          <button style={{ marginLeft: 8, background: '#f5f5f5', border: 'none', borderRadius: 6, padding: '4px 10px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Change Role</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ color: '#888', fontSize: 14, textAlign: 'left', padding: '24px 0 8px 40px', background: 'transparent', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span>© 2020 E-Book Reader. All rights reserved.</span>
        <span style={{ fontSize: 13, color: '#444', marginTop: 2 }}>Made with <span style={{ color: '#00bfff', fontWeight: 700 }}>Yisily</span></span>
      </footer>
    </div>
  );
}

export default Dashboard; 