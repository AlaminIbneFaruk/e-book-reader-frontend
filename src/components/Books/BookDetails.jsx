import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkMsg, setBookmarkMsg] = useState("");

  useEffect(() => {
    fetch(`https://e-book-reader.onrender.com/api/v1/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBook(data.data);
        }
        setLoading(false);
      });
  }, [id]);

  const handleBookmark = async () => {
    setBookmarkMsg("");
    try {
      const res = await fetch(
        `https://e-book-reader.onrender.com/api/v1/users/bookmark/${uid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId: id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setBookmarked(true);
        setBookmarkMsg("Bookmarked!");
      } else {
        setBookmarkMsg(data.message || "Failed to bookmark");
      }
    } catch {
      setBookmarkMsg("Network error");
    }
  };

  if (loading)
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  if (!book)
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>Book not found.</div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafbfc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: "2rem",
          marginBottom: "0.5rem",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: 36 }}>{book.title}</h1>
        <button
          onClick={handleBookmark}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 28,
            color: bookmarked ? "#18806d" : "#bbb",
            marginLeft: 8,
          }}
          title="Bookmark"
        >
          {bookmarked ? "★" : "☆"}
        </button>
        {bookmarkMsg && (
          <span style={{ color: "#18806d", fontWeight: 500, marginLeft: 8 }}>
            {bookmarkMsg}
          </span>
        )}
      </div>
      <div style={{ color: "#888", marginBottom: 16 }}>
        {book.type || "Paperback"}
      </div>
      <img
        src={book.coverImage}
        alt={book.title}
        style={{
          width: 350,
          maxWidth: "90vw",
          borderRadius: 12,
          boxShadow: "0 2px 12px #eee",
          marginBottom: 32,
        }}
      />
      <button
        style={{
          marginTop: 24,
          padding: "14px 48px",
          borderRadius: 6,
          background: "#18806d",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        Read Book
      </button>

      {/* Modal Dialog */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                background: "transparent",
                border: "none",
                fontSize: 28,
                cursor: "pointer",
                color: "#888",
              }}
              aria-label="Close"
            >
              ×
            </button>

            <iframe
              src={book.pdfUrl}
              title="Book PDF"
              style={{
                border: "none",
                borderRadius: 8,
                pointerEvents: "none", // disables all interactions
              }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default BookDetails;
