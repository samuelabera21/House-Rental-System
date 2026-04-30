"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui", label: "Renter Dashboard" },
  owner: { href: "/owner", label: "Owner Dashboard" },
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("hrms_active_user") || "null");
      const isLoggedIn = localStorage.getItem("hrms_is_logged_in") === "true";
      setActiveRole(isLoggedIn ? savedUser?.role || null : null);
    } catch {
      setActiveRole(null);
    }
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
    localStorage.removeItem("hrms_active_user");
    localStorage.removeItem("hrms_is_logged_in");
    setActiveRole(null);
    router.push("/");
  };

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
            <button type="button" className="nav-link nav-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
