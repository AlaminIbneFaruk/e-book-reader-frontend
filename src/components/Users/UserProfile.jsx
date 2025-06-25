import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://e-book-reader.onrender.com/api/v1/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  ) : <p>Loading...</p>;
}
export default UserProfile; 