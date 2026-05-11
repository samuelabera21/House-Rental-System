import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="page-container footer-inner">
        <div className="footer-grid">
          <div className="footer-column footer-about">
            <div className="footer-brand">
              <span className="footer-brand-mark" aria-hidden="true">
                <svg viewBox="0 0 64 64" role="img" aria-hidden="true">
                  <path d="M8 34L32 14l16 12v28H40V32H24v22H8z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M48 22V10l8-6v50h-8V22z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>New Home</h3>
            </div>
            <p>
              A contemporary theme we designed specifically for real estate and property showcase websites, equipped with every option, element and feature your site may need.
            </p>
            <Link href="/#featured" className="footer-read-more">
              Read more
            </Link>
          </div>

          <div className="footer-column">
            <h4>Contact us</h4>
            <ul className="footer-list">
              <li>Debre Berhan, Ethiopia</li>
              <li>+251 91 234 5678</li>
              <li>+251 11 234 5678</li>
              <li>newhome@example.com</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Categories</h4>
            <ul className="footer-list footer-links-list">
              <li><Link href="/#featured">Recent property</Link></li>
              <li><Link href="/#featured">To Sell</Link></li>
              <li><Link href="/#featured">To Buy</Link></li>
              <li><Link href="/#featured">To Rent</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Links</h4>
            <ul className="footer-list footer-links-list">
              <li><Link href="/">Latest News</Link></li>
              <li><Link href="/">About Us</Link></li>
              <li><Link href="/">FAQ Page</Link></li>
              <li><Link href="/">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} House Rental Management System</p>
          <div className="footer-socials">
            <span className="footer-follow-label">Follow us:</span>
            <Link href="/">Instagram</Link>
            <Link href="/">Facebook</Link>
            <Link href="/">Youtube</Link>
            <Link href="/">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
