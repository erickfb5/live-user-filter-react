import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://randomuser.me/api?results=50");
      const { results } = await res.json();
      setUsers(results);
    }
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h4 className="title">Live User Filter</h4>
        <small className="subtitle">Search by name and/or location</small>
        <input
          type="text"
          id="filter"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </header>

      <ul id="result" className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.login.uuid}>
              <img src={user.picture.large} alt={user.name.first} />
              <div className="user-info">
                <h4>{`${user.name.first} ${user.name.last}`}</h4>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
              </div>
            </li>
          ))
        ) : (
          <li>
            <h3>Loading...</h3>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
