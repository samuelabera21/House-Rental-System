"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLE_REDIRECT = {
  renter: "/Renter_ui",
  owner: "/",
  admin: "/",
};

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("renter");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const savedUsers = JSON.parse(localStorage.getItem("hrms_users") || "[]");
    const matchedUser = savedUsers.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    );

    const role = matchedUser?.role || selectedRole;

    if (!email.trim() || !password.trim()) {
      setError("Please provide email and password.");
      return;
    }

    localStorage.setItem(
      "hrms_active_user",
      JSON.stringify({ email: email.trim(), role }),
    );

    router.push(ROLE_REDIRECT[role] || "/");
  };

  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Login</h1>
        <p>Sign in to continue to your role-based dashboard.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            Role (fallback if account is not registered in demo storage)
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
            >
              <option value="renter">Renter</option>
              <option value="owner">House Owner</option>
            </select>
          </label>
          {error ? <p className="auth-error">{error}</p> : null}
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
