import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/owner", label: "Owner Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
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
        </nav>
      </div>
    </header>
  );
}
