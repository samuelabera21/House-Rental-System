"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";
import { useTheme } from "../app/context/ThemeContext";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui", label: "Dashboard" },
  owner: { href: "/owner", label: "Dashboard" },
  admin: { href: "/admin", label: "Dashboard" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = getActiveUser();
    setActiveUser(savedUser);
    setActiveRole(savedUser?.role || null);
    // sync current location when pathname changes
    setCurrentLocation(pathname);
  }, [pathname]);

  useEffect(() => {
    setCurrentLocation(window.location.pathname + window.location.hash);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    clearActiveUser();
    setActiveUser(null);
    setActiveRole(null);
    setIsAccountMenuOpen(false);
    router.push("/");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${theme}`}>
      <div className="navbar-logo">
        <Link href="/">Rental House</Link>
      </div>
      <div className="navbar-links">
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          href="/#featured"
          className={currentLocation.endsWith("#featured") ? "active" : ""}
        >
          Featured
        </Link>
        <Link
          href="/#highlights"
          className={currentLocation.endsWith("#highlights") ? "active" : ""}
        >
          Highlights
        </Link>
        <Link
          href="/#about"
          className={currentLocation.endsWith("#about") ? "active" : ""}
        >
          About
        </Link>
        {activeRole && DASHBOARD_BY_ROLE[activeRole] && (
          <Link
            href={DASHBOARD_BY_ROLE[activeRole].href}
            className={
              pathname === DASHBOARD_BY_ROLE[activeRole].href ? "active" : ""
            }
          >
            {DASHBOARD_BY_ROLE[activeRole].label}
          </Link>
        )}
      </div>
      <div className="navbar-actions">
        {activeUser ? (
          <div className="relative" ref={accountMenuRef}>
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center gap-2"
            >
              <span>{activeUser.name}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="login-button">
            Login
          </Link>
        )}
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
