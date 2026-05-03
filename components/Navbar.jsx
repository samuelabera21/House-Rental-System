"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui", label: "Renter Dashboard" },
  owner: { href: "/owner", label: "Owner Dashboard" },
  admin: { href: "/admin", label: "Admin Dashboard" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const savedUser = getActiveUser();
    setActiveUser(savedUser);
    setActiveRole(savedUser?.role || null);
  }, [pathname]);

  const navLinks = useMemo(() => {
    const baseLinks = [{ href: "/", label: "Home" }];

    if (activeRole && DASHBOARD_BY_ROLE[activeRole]) {
      return [...baseLinks, DASHBOARD_BY_ROLE[activeRole]];
    }

    return [
      ...baseLinks,
      { href: "/login", label: "Login" },
      { href: "/register", label: "Register" },
    ];
  }, [activeRole]);

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
        <Link href="/" className="brand">
          House Rental System
        </Link>
        <nav aria-label="Main navigation" className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {activeRole ? (
            <div className="nav-user-area">
              <div className="nav-user-chip" title={activeUser?.fullName || "Active user"}>
                {activeUser?.profileImage ? (
                  <img src={activeUser.profileImage} alt="" />
                ) : (
                  <span>{avatarLabel}</span>
                )}
                <span>{activeUser?.fullName || activeRole}</span>
              </div>
              <button type="button" className="nav-link nav-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
