import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/users">Manage Users</Link></li>
        <li><Link to="/">Go to Main Website</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
