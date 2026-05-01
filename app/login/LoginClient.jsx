"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLE_REDIRECT = {
  renter: "/Renter_ui",
  owner: "/owner",
  admin: "/",
};

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please provide email and password.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("hrms_users") || "[]");
    const matchedUser = savedUsers.find(
      (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword,
    );

    if (!matchedUser) {
      setError("No account found for these credentials. Please register first.");
      return;
    }

    const role = matchedUser.role;

    localStorage.setItem(
      "hrms_active_user",
      JSON.stringify({ email: matchedUser.email, role, fullName: matchedUser.fullName }),
    );
    localStorage.setItem("hrms_is_logged_in", "true");

    router.push(ROLE_REDIRECT[role] || "/");
  };

  return (
    <section className="section-block auth-section login-section">
      <div className="page-container auth-container login-container">
        <div className="login-shell">
          <aside className="login-aside" aria-hidden="true">
            <span className="login-badge">Welcome back</span>
            <h2>Find your next home in minutes.</h2>
            <p>
              Sign in to manage your saved houses, messages, and rental requests from one place.
            </p>
          </aside>

          <div className="login-form-wrap">
            <h1>Login</h1>
            <p>Sign in with your registered email and password.</p>
            <form className="auth-form login-form" onSubmit={handleSubmit}>
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
              {error ? <p className="auth-error">{error}</p> : null}
              <button type="submit">Login</button>
            </form>
            <p className="auth-switch login-switch">
              Don&apos;t have an account? <Link href="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
