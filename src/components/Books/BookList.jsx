import { useEffect, useState } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://e-book-reader.onrender.com/api/v1/books/')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      {books.map(book => (
        <div key={book._id}>
          <h3>{book.title}</h3>
        </div>
      ))}
    </div>
  );
}
export default BookList; 