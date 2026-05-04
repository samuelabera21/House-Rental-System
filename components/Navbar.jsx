"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";

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
  const isHomePage = pathname === "/";
  const [currentLocation, setCurrentLocation] = useState(
    typeof window !== "undefined" ? window.location.pathname + window.location.hash : pathname
  );

  useEffect(() => {
    const savedUser = getActiveUser();
    setActiveUser(savedUser);
    setActiveRole(savedUser?.role || null);
    // sync current location when pathname changes (client only)
    if (typeof window !== "undefined") {
      setCurrentLocation(window.location.pathname + window.location.hash);
    }
  }, [pathname]);

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
    const onHashChange = () => setCurrentLocation(window.location.pathname + window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  const navLinks = useMemo(() => {
    const baseLinks = isHomePage
      ? [
          { href: "/#home", label: "Home" },
          { href: "/#featured", label: "Featured" },
          { href: "/#highlights", label: "Highlights" },
          { href: "/#about", label: "About" },
        ]
      : [{ href: "/", label: "Home" }];
    if (activeRole && DASHBOARD_BY_ROLE[activeRole]) {
      return [...baseLinks, DASHBOARD_BY_ROLE[activeRole]];
    }

    // Keep navigation links separate from auth actions for clearer layout
    return [...baseLinks];
  }, [activeRole, isHomePage]);

  const handleLogout = () => {
    clearActiveUser();
    setActiveRole(null);
    setActiveUser(null);
    router.push("/");
  };

  const avatarLabel =
    String(activeUser?.fullName || "User")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U";

  const displayName = String(activeUser?.fullName || activeRole || "Account")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  return (
    <header className="navbar-wrap">
      <div className="page-container navbar">
        <div className="navbar-pill">
          <Link href="/" className="navbar-brand" aria-label="House Rental System home">
            <span className="navbar-brand-badge">HR</span>
            <span>House Rental System</span>
          </Link>

          <nav aria-label="Main navigation" className="nav-links">
            {navLinks.map((link) => {
              const linkTarget = link.href;
              const isActive =
                currentLocation === linkTarget || (linkTarget === "/" && pathname === "/") ||
                (pathname === "/" && linkTarget.startsWith("/#") && currentLocation.endsWith(linkTarget.slice(1)));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Auth actions (Login/Register) shown when there's no active user */}
            {!activeRole ? (
              <div className="auth-actions">
                <Link href="/login" className="btn btn-primary" aria-label="Login">
                  Login
                </Link>
              </div>
            ) : (
              <div className="nav-user-area" ref={accountMenuRef}>
                <button
                  type="button"
                  className="nav-account-btn"
                  aria-haspopup="menu"
                  aria-expanded={isAccountMenuOpen}
                  onClick={() => setIsAccountMenuOpen((current) => !current)}
                >
                  {activeUser?.profileImage ? (
                    <img src={activeUser.profileImage} alt="" className="nav-account-avatar" />
                  ) : (
                    <span className="nav-account-avatar nav-account-initials">{avatarLabel}</span>
                  )}
                  <span className="nav-account-label">Account</span>
                  <span className="nav-account-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>

                {isAccountMenuOpen ? (
                  <div className="nav-account-menu" role="menu">
                    <div className="nav-account-meta">
                      <strong>{displayName}</strong>
                      <span>{activeRole}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="nav-account-menu-item"
                      role="menuitem"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {DASHBOARD_BY_ROLE[activeRole] ? (
                      <Link
                        href={DASHBOARD_BY_ROLE[activeRole].href}
                        className="nav-account-menu-item"
                        role="menuitem"
                        onClick={() => setIsAccountMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      className="nav-account-menu-item nav-account-logout"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
