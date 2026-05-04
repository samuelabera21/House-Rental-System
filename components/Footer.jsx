import Link from "next/link";

export default function Footer() {
  const marqueeItems = Array.from({ length: 10 }, () => "Building the future •");

  return (
    <footer className="footer-wrap">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          {marqueeItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

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
