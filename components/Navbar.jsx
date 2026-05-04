"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui", label: "Workspace" },
  owner: { href: "/owner", label: "Workspace" },
  admin: { href: "/admin", label: "Workspace" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const savedUser = getActiveUser();
    setActiveUser(savedUser);
    setActiveRole(savedUser?.role || null);
  }, [pathname]);

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
      const profileLinks =
        activeRole === "admin" ? [] : [{ href: "/profile", label: "Profile" }];

      return [...baseLinks, DASHBOARD_BY_ROLE[activeRole], ...profileLinks];
    }

    return [
      ...baseLinks,
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ];
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

  return (
    <header className="navbar-wrap">
      <div className="page-container navbar">
        <div className="navbar-pill">
          <Link href="/" className="navbar-brand" aria-label="House Rental System home">
            <span className="navbar-brand-badge">HR</span>
            <span>House Rental System</span>
          </Link>

          <nav aria-label="Main navigation" className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
            {activeRole ? (
              <div className="nav-user-area">
                {activeRole === "admin" ? (
                  <div className="nav-user-chip" title={activeUser?.fullName || "Active user"}>
                    {activeUser?.profileImage ? (
                      <img src={activeUser.profileImage} alt="" />
                    ) : (
                      <span>{avatarLabel}</span>
                    )}
                    <span>{activeUser?.fullName || activeRole}</span>
                  </div>
                ) : (
                  <Link href="/profile" className="nav-user-chip" title="Open profile">
                    {activeUser?.profileImage ? (
                      <img src={activeUser.profileImage} alt="" />
                    ) : (
                      <span>{avatarLabel}</span>
                    )}
                    <span>{activeUser?.fullName || activeRole}</span>
                  </Link>
                )}
                <button
                  type="button"
                  className="nav-link nav-logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
