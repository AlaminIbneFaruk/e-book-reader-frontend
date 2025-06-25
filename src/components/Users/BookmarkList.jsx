import { useEffect, useState } from 'react';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch('https://e-book-reader.onrender.com/api/v1/users/all-bookmarks/')
      .then(res => res.json())
      .then(data => setBookmarks(data));
  }, []);

  return (
    <ul>
      {bookmarks.map(b => (
        <li key={b._id}>{b.title}</li>
      ))}
    </ul>
  );
}
export default BookmarkList; 