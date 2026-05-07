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
          <div className="theme-toggle-dot"></div>
        </button>
      </div>
    </nav>
  );
}
