import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="page-container footer-inner">
        <div className="footer-bar">
          <div>
            <p>© {new Date().getFullYear()} House Rental Management System</p>
            <p>Built for renters, owners, and administrators.</p>
          </div>

          <span className="footer-status">
            <span className="footer-status-dot" aria-hidden="true" />
            Available for inquiries
          </span>

          <Link href="/#featured" className="footer-cta">
            Explore homes
          </Link>
        </div>
      </div>
    </footer>
  );
}
