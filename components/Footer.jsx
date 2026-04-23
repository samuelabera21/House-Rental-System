export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="page-container footer-inner">
        <p>© {new Date().getFullYear()} House Rental Management System</p>
        <p>Built for renters, owners, and administrators.</p>
      </div>
    </footer>
  );
}
