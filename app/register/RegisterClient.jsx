"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mergeUsersWithSystemAdmins } from "../../lib/systemAdmins";

export default function RegisterClient() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    // validations
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])/; // letter, number, symbol
    const phoneRegex = /^09\d{8}$/; // starts with 09 and total 10 digits

    if (trimmedName.length < 6) {
      setMessage("Full name must be at least 6 characters.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(trimmedPhone)) {
      setMessage("Phone must be 10 digits and start with 09.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage("Password must include a letter, a number, and a symbol.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!role) {
      setMessage("Please select a role.");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("hrms_users") || "[]");
    const usersWithAdmins = mergeUsersWithSystemAdmins(savedUsers);
    const isExistingUser = usersWithAdmins.some(
      (user) => user.email.toLowerCase() === trimmedEmail,
    );

    if (isExistingUser) {
      setMessage("An account with this email already exists.");
      return;
    }

    const nextUsers = [
      ...savedUsers,
      {
        fullName: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        address: address.trim(),
        password,
        role,
      },
    ];

    localStorage.setItem("hrms_users", JSON.stringify(nextUsers));

    router.push("/login");
  };

  return (
    <section className="section-block auth-section register-section">
      <div className="page-container auth-container register-container">
        <div className="register-shell">
          <aside className="register-aside" aria-hidden="true">
            <span className="register-badge">Create profile</span>
            <h2>Start listing or renting without delays.</h2>
            <p>
              Join the platform to browse homes, post listings, and manage requests with ease.
            </p>
          </aside>

          <div className="register-form-wrap">
            <h1>Create account</h1>
            <p>Fill in your details, choose your role, and create your account.</p>
            <form className="auth-form register-form" onSubmit={handleSubmit}>
              <div className="auth-form-grid register-grid">
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
                  Address
                  <input
                    type="text"
                    placeholder="Your city or area"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
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
                  Select your role
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Choose your role
                    </option>
                    <option value="renter">Renter</option>
                    <option value="owner">House Owner</option>
                  </select>
                </label>
              </div>
              <label className="register-consent">
                <input type="checkbox" required />
                <span>I agree to the terms and privacy policy.</span>
              </label>
              {message ? <p className="auth-error">{message}</p> : null}
              <button type="submit">Create Account</button>
            </form>
            <p className="auth-switch register-switch">
              Already have an account? <Link href="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
