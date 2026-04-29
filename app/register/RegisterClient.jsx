"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterClient() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("renter");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("hrms_users") || "[]");
    const isExistingUser = savedUsers.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (isExistingUser) {
      setMessage("An account with this email already exists.");
      return;
    }

    const nextUsers = [
      ...savedUsers,
      {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role,
      },
    ];

    localStorage.setItem("hrms_users", JSON.stringify(nextUsers));
    localStorage.setItem(
      "hrms_active_user",
      JSON.stringify({ email: email.trim(), role }),
    );

    router.push("/login");
  };

  return (
    <section className="section-block auth-section">
      <div className="page-container auth-container">
        <h1>Create account</h1>
        <p>Register as a renter or house owner to access your dashboard.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </label>
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
            Phone Number
            <input
              type="tel"
              placeholder="+251 9XX XXX XXX"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </label>
          <label>
            Role
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="renter">Renter</option>
              <option value="owner">House Owner</option>
            </select>
          </label>
          <label className="flex items-start gap-2 text-sm font-medium text-slate-700">
            <input className="mt-1" type="checkbox" required />
            <span>I agree to the terms and privacy policy.</span>
          </label>
          {message ? <p className="auth-error">{message}</p> : null}
          <button type="submit">Create Account</button>
        </form>
        <p className="mt-3 text-sm text-slate-600">
          Already have an account?{" "}
          <a
            className="font-semibold text-blue-600 hover:text-blue-700"
            href="/login"
          >
            Login here
          </a>
        </p>
      </div>
    </section>
  );
}
