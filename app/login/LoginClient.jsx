"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMergedAccounts, getSavedUsers, setActiveUser } from "../../lib/auth";

const ROLE_REDIRECT = {
  renter: "/Renter_ui",
  owner: "/owner",
  admin: "/admin",
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

    const savedUsers = getSavedUsers();
    const usersWithAdmins = getMergedAccounts(savedUsers);
    const matchedUser = usersWithAdmins.find(
      (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword,
    );

    if (!matchedUser) {
      setError("No account found for these credentials. Please register first.");
      return;
    }
// role is determined by the matched user, which is used to redirect to the appropriate dashboard after login

    
    setActiveUser(matchedUser);

    if (matchedUser.role === "owner" && matchedUser.isApproved === false) {
      router.push("/owner/pending-approval");
      return;
    }

    const role = matchedUser.role;

    router.push(ROLE_REDIRECT[role] || "/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block h-full" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1505691723518-36a5b7f1a1d5?auto=format&fit=crop&w=1400&q=80"
            alt="Homes"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center p-8 relative z-10">
            <div className="text-white max-w-xs">
              <span className="inline-block bg-orange-500 text-xs uppercase px-3 py-1 rounded-full mb-4">Welcome back</span>
              <h2 className="text-3xl font-bold mb-2">Find your next home in minutes.</h2>
              <p className="opacity-90">Sign in to manage your saved houses, messages, and rental requests from one place.</p>
              <div className="flex gap-2 mt-4 text-sm opacity-90">
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Saved homes</span>
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Fast access</span>
                <span className="bg-white bg-opacity-10 px-3 py-1 rounded">Private inbox</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold mb-2">Login</h1>
            <p className="text-sm text-gray-600 mb-6">Sign in with your registered email and password.</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
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
                <span className="text-sm font-medium text-gray-700">Password</span>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 box-border"
                />
              </label>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600">
              Don&apos;t have an account? <Link href="/register" className="text-orange-600 font-medium">Register here</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
