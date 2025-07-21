import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful!");
      // Redirect to dashboard
      window.location.href = "/admin/dashboard";
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
