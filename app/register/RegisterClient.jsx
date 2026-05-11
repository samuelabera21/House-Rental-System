"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearActiveUser, getMergedAccounts, getSavedUsers, STORAGE_KEYS } from "../../lib/auth";

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

    const savedUsers = getSavedUsers();
    const usersWithAdmins = getMergedAccounts(savedUsers);
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
        profileImage: "",
        bio: "",
        password,
        role,
        accountStatus: role === "owner" ? "Pending Approval" : "Active",
        isApproved: role !== "owner",
      },
    ];

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(nextUsers));
    // Registration stores account data only; login creates authenticated session state.
    clearActiveUser();

    router.push("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-semibold mb-2">Create account</h1>
              <p className="text-sm text-gray-600 mb-6">Fill in your details, choose your role, and create your account.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Full Name</span>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Phone Number</span>
                    <input
                      type="tel"
                      placeholder="+251 9XX XXX XXX"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Address</span>
                    <input
                      type="text"
                      placeholder="Your city or area"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Password</span>
                    <input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Confirm Password</span>
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-gray-700">Select your role</span>
                    <select
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                    >
                      <option value="" disabled>
                        Choose your role
                      </option>
                      <option value="renter">Renter</option>
                      <option value="owner">House Owner</option>
                    </select>
                  </label>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" required className="w-4 h-4" />
                  <span>I agree to the terms and privacy policy.</span>
                </label>

                {message ? <p className="text-sm text-red-600">{message}</p> : null}

                <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium">Create Account</button>
              </form>

              <p className="mt-6 text-sm text-gray-600">
                Already have an account? <Link href="/login" className="text-orange-600 font-medium">Login here</Link>
              </p>
            </div>
          </div>
        </div>

        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80')",
          }}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-8">
            <div className="text-white max-w-xs">
              <span className="inline-block bg-orange-500 text-xs uppercase px-3 py-1 rounded-full mb-4">Create profile</span>
              <h2 className="text-3xl font-bold mb-2">Start listing or renting without delays.</h2>
              <p className="opacity-90">Join the platform to browse homes, post listings, and manage requests with ease.</p>
              <div className="flex gap-2 mt-4 text-sm opacity-90">
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Quick signup</span>
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Role based</span>
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Secure access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
