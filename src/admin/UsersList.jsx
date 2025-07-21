import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
    });
    fetchUsers(); // Refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Users List</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => deleteUser(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
