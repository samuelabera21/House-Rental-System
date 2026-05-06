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
  const [currentLocation, setCurrentLocation] = useState(pathname);

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

  // Position the moving active indicator under the currently active nav link
  // indicator removed — keep simple active link styling

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

  // determine active nav link to set navbar background
  const activeLink = useMemo(() => {
    return navLinks.find((link) => {
      const linkTarget = link.href;
      return (
        currentLocation === linkTarget ||
        (linkTarget === "/" && pathname === "/") ||
        (pathname === "/" && linkTarget.startsWith("/#") && currentLocation.endsWith(linkTarget.slice(1)))
      );
    });
  }, [navLinks, currentLocation, pathname]);

  const activeHref = activeLink?.href || pathname || "/";
  const bgClass = useMemo(() => {
    const key = String(activeHref)
      .replace(/^\/?#?/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
    return key ? `bg-${key}` : "bg-home";
  }, [activeHref]);

  // When on the home page, observe sections so active nav updates on scroll
  useEffect(() => {
    if (!isHomePage) return;
    const ids = ["home", "featured", "highlights", "about"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setCurrentLocation(`/${id ? `#${id}` : ""}`);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -40% 0px", threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <header className={`navbar-wrap ${bgClass}`}>
      <div className="page-container navbar">
        <div className="navbar-pill">
          <Link href="/" className="navbar-brand" aria-label="House Rental System home">
            <span className="navbar-brand-badge">HR</span>
            <span>House Rental System</span>
          </Link>

          <nav aria-label="Main navigation" className="nav-links">
            <div className="nav-main">
              {navLinks.map((link) => {
              const linkTarget = link.href;
              const isActive =
                currentLocation === linkTarget || (linkTarget === "/" && pathname === "/") ||
                (linkTarget === "/#home" && pathname === "/" && currentLocation === "/") ||
                (pathname === "/" && linkTarget.startsWith("/#") && currentLocation.endsWith(linkTarget.slice(1)));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => {
                    // ensure immediate update when clicking hash/nav links
                    try {
                      setCurrentLocation(link.href);
                    } catch (e) {
                      /* ignore */
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            </div>

            {/* decorative indicator removed for simpler navbar */}

            {/* Auth actions (Login/Register) shown when there's no active user */}
            {!activeRole ? (
              <div className="auth-actions">
                <Link
                  href="/login"
                  className={`btn btn-primary ${pathname === "/login" || currentLocation === "/login" ? "active-login" : ""}`}
                  aria-label="Login"
                  onClick={() => setCurrentLocation("/login")}
                >
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
