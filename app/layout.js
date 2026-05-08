import "../styles/globals.css";
import "../styles/Navbar.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import ThemedBody from "./ThemedBody";

export const metadata = {
  title: "House Rental Management System",
  description: "Find and manage rental houses with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ThemedBody>
          <div className="app-shell">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemedBody>
      </ThemeProvider>
    </html>
  );
}
