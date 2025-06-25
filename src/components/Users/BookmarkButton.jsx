function BookmarkButton({ bookId }) {
  const handleBookmark = async () => {
    const res = await fetch(`https://e-book-reader.onrender.com/api/v1/users/bookmark/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
    const data = await res.json();
    alert('Bookmarked!');
  };

  return <button onClick={handleBookmark}>Bookmark</button>;
}
export default BookmarkButton; 