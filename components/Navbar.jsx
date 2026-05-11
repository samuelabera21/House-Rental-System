"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";
import { useTheme } from "../app/context/ThemeContext";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui#browse", label: "Browse House" },
  owner: null,
  admin: { href: "/admin", label: "Dashboard" },
};

const ROLE_NAV_OVERRIDES = {
  owner: [
    { href: "/", label: "Home", active: false },
    { href: "/#featured", label: "Featured", active: false },
    { href: "/#services", label: "Highlights", active: false },
    { href: "/owner/new-listing", label: "Add Listing", active: false },
  ],
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

  const avatarLabel = useMemo(() => {
    const fullName = String(activeUser?.fullName || activeUser?.name || "").trim();

    if (!fullName) {
      return "A";
    }

    return fullName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [activeUser]);

  const refreshActiveUser = () => {
    const savedUser = getActiveUser();
    setActiveUser(savedUser);
    setActiveRole(savedUser?.role || null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    refreshActiveUser();
    setCurrentLocation(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleAuthChange = () => {
      refreshActiveUser();
    };

    window.addEventListener("hrms-auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("hrms-auth-change", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const syncLocation = () => {
      setCurrentLocation(window.location.pathname + window.location.hash);
    };

    syncLocation();
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);

    return () => {
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
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

  const handleNavLinkClick = (href) => {
    // If the link contains a hash and we're on the same page, scroll to top first
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      // If we're on a different page (e.g. /owner) and link targets a home anchor,
      // navigate to the home route first so the anchor will be available.
      if (path === "" && pathname !== "/") {
        // use router to navigate to the home anchor
        router.push(href);
        return;
      }

      if (path === pathname || path === "") {
        // Scroll to top smoothly, then let browser handle anchor scroll
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Small delay to ensure smooth transition
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
  };

  // Use role-specific nav overrides when available (owner, renter, admin can customize)
  const baseNav = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/#featured", label: "Featured", active: currentLocation.endsWith("#featured") },
    { href: "/#services", label: "Highlights", active: currentLocation.endsWith("#services") },
    { href: "/#testimonials", label: "About", active: currentLocation.endsWith("#testimonials") },
  ];

  const navSections = activeRole && ROLE_NAV_OVERRIDES[activeRole]
    ? ROLE_NAV_OVERRIDES[activeRole].map((item) => ({
        ...item,
        isCta: item.href === "/owner/new-listing",
        active:
          item.href === "/"
            ? pathname === "/"
            : currentLocation.endsWith(item.href.split("#")[1] || ""),
      }))
    : baseNav;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""} ${theme}`}>
      <div className="navbar-logo">
        <Link href="/">Rental House</Link>
      </div>
      <div className="navbar-links">
        {navSections.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${item.active ? "active" : ""} ${item.isCta ? "navbar-cta-link" : ""}`}
            onClick={() => handleNavLinkClick(item.href)}
          >
            {item.label}
          </Link>
        ))}
        {activeRole && DASHBOARD_BY_ROLE[activeRole] && (
          <Link
            href={DASHBOARD_BY_ROLE[activeRole].href}
            className={
              currentLocation.endsWith("#browse")
                ? "active"
                : pathname === DASHBOARD_BY_ROLE[activeRole].href
                  ? "active"
                  : ""
            }
            onClick={() =>
              handleNavLinkClick(DASHBOARD_BY_ROLE[activeRole].href)
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
              className="account-toggle-button flex items-center gap-2"
              aria-label={activeUser.fullName || activeUser.name || "Open account menu"}
            >
              <span className="account-toggle-avatar" aria-hidden="true">
                {activeUser.profileImage ? (
                  <img src={activeUser.profileImage} alt="" />
                ) : (
                  avatarLabel
                )}
              </span>
              <svg
                className="w-4 h-4 account-toggle-icon"
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
              <div className="account-menu-panel absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="account-menu-link block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="account-menu-link block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
