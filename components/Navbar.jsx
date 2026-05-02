"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearActiveUser, getActiveUser } from "../lib/auth";

const DASHBOARD_BY_ROLE = {
  renter: { href: "/Renter_ui", label: "Renter Dashboard" },
  owner: { href: "/owner", label: "Owner Dashboard" },
};

const BASE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    const savedUser = getActiveUser();
    setActiveRole(savedUser?.role || null);
  }, [pathname]);

  const navLinks = useMemo(() => {
    const baseLinks = [...BASE_LINKS];

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
