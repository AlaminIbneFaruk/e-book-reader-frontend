function BookCard({ book }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      {/* Add more book details as needed */}
    </div>
  );
}
export default BookCard; 