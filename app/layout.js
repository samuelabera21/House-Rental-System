import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "House Rental Management System",
  description: "Find and manage rental houses with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Global app shell keeps shared navigation and footer across pages */}
        <div className="app-shell">
          <Navbar />
          <main className="app-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
