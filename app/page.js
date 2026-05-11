"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./context/ThemeContext";

const properties = [
  {
    id: 1,
    title: "South Sun House",
    location: "VILLAS - Brooklyn",
    price: "265,000",
    sqm: "290m²",
    beds: 4,
    baths: 3,
    type: "Sell",
    image: "https://images.unsplash.com/photo-1570129477492-45b003d3e8d6?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Mountain Cabin",
    location: "VILLAS - Brooklyn",
    price: "89,000",
    sqm: "125m²",
    beds: 2,
    baths: 2,
    type: "For Rent",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Pine Forest Bungalow",
    location: "CONDOS - Staten Island",
    price: "1,200",
    sqm: "160m²",
    beds: 4,
    baths: 2,
    type: "For Rent",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "White Stylish Loft",
    location: "APARTMENTS - Queens",
    price: "550,000",
    sqm: "250m²",
    beds: 4,
    baths: 3,
    type: "For Rent",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Park House",
    location: "CONDOS - Manhattan",
    price: "2,200",
    sqm: "150m²",
    beds: 2,
    baths: 2,
    type: "Sell",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Avenue Apartment",
    location: "APARTMENTS - The Bronx",
    price: "1,200",
    sqm: "160m²",
    beds: 4,
    baths: 2,
    type: "For Rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  },
];

const howItWorks = [
  {
    icon: "🏠",
    title: "Find real estate",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.",
  },
  {
    icon: "👤",
    title: "Meet relator",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.",
  },
  {
    icon: "📋",
    title: "Documents",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.",
  },
  {
    icon: "🔑",
    title: "Take the keys",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est ei graeco quod suavitate vix.",
  },
];

const services = [
  {
    icon: "💡",
    title: "Find inspiration",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est e graeco quod suavitate vix ad praesent.",
  },
  {
    icon: "🎨",
    title: "Find architect/designer",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est e graeco quod suavitate vix ad praesent.",
  },
  {
    icon: "🛠️",
    title: "Begin renovation",
    description: "Sumo potentium ut per, at his wisim utinam adipiscing. Est e graeco quod suavitate vix ad praesent.",
  },
];

const testimonials = [
  {
    name: "Ellie Holmes",
    role: "SALES ADVISOR",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Tiana Ray",
    role: "HOME INSPECTOR",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Kevin Wels",
    role: "MANAGER",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    name: "Chase Wales",
    role: "AGENT",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "REAL ESTATE CONSULTANT",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "PROPERTY DEVELOPER",
    message: "Ut vix primis tractatos. Ad est alterum epicuri accusamus. Duo per id his qualisque deseruisse reformidans ex, quo omneaque cotidieque. Dolor volutpua per, his in congue.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [testimonialsOffset, setTestimonialsOffset] = useState(0);
  const [enquiryGlow, setEnquiryGlow] = useState({ x: 50, y: 50 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroScroll, setHeroScroll] = useState(0);
  const carouselRef = useRef(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Enquiry submitted:", formData);
    setFormData({ name: "", email: "", phone: "" });
    alert("Thank you for your enquiry!");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", newsletterEmail);
    setNewsletterEmail("");
    alert("Successfully subscribed!");
  };

  const handlePropertyClick = () => {
    router.push("/login");
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnquiryMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setEnquiryGlow({ x, y });
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialsOffset((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHeroLoaded(true));

    const handleScroll = () => {
      setHeroScroll(Math.min(window.scrollY * 0.12, 120));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll animations on mount and scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = getAnimationForElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationForElement = (element) => {
    const type = element.getAttribute("data-animate");
    switch (type) {
      case "left":
        return "fadeInLeft 0.8s ease-out forwards";
      case "right":
        return "fadeInRight 0.8s ease-out forwards";
      case "up":
        return "fadeInUp 0.8s ease-out forwards";
      case "scale":
        return "scaleIn 0.8s ease-out forwards";
      default:
        return "fadeInUp 0.8s ease-out forwards";
    }
  };

  return (
    <div className="rentora-home" style={{ backgroundColor: isDarkMode ? "#222" : "#fff", color: isDarkMode ? "#fff" : "#333" }}>
      {/* Navbar removed from page — using global `Navbar` component in layout */}

      {/* Hero Section */}
      <section id="home" className="hero hero-surface" style={{
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        marginTop: "60px",
        overflow: "hidden",
      }}>
        <div className={`hero-background ${heroLoaded ? "hero-background--loaded" : ""}`} style={{
          backgroundImage: "linear-gradient(115deg, rgba(12,14,18,0.62) 0%, rgba(12,14,18,0.34) 36%, rgba(12,14,18,0.18) 100%), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&h=1200&fit=crop')",
          transform: `translate3d(0, ${heroScroll * 0.1}px, 0) scale(${heroLoaded ? 1 : 1.08})`,
        }} />
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className={`hero-float hero-float-one ${heroLoaded ? "hero-float--visible" : ""}`} />
        <div className={`hero-float hero-float-two ${heroLoaded ? "hero-float--visible" : ""}`} />
        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          color: "white",
          paddingLeft: "60px",
          transform: `translateY(${heroLoaded ? 0 : 24}px)`,
          opacity: heroLoaded ? 1 : 0,
          transition: "transform 900ms ease, opacity 900ms ease",
        }}>
          {/* hero tagline removed as requested */}
          <h1 style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "20px",
            lineHeight: 1.2,
            animation: "slideInDown 0.8s ease-out 0.1s backwards",
          }}>
            Empowering You With<br />Smarter and Simpler Rentals
          </h1>
          <p style={{
            fontSize: "18px",
            marginBottom: "40px",
            maxWidth: "600px",
            lineHeight: 1.6,
            animation: "slideInDown 0.8s ease-out 0.2s backwards",
          }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
          </p>
          <div style={{ display: "flex", gap: "20px", animation: "slideInDown 0.8s ease-out 0.3s backwards" }}>
            <button style={{
              backgroundColor: "#ff6b35",
              color: "white",
              padding: "12px 30px",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "500",
            }}>
              Get Started
            </button>
            <button style={{
              backgroundColor: "transparent",
              color: "white",
              padding: "12px 30px",
              border: "2px solid white",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "500",
            }}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="featured" style={{ padding: "80px 60px", backgroundColor: isDarkMode ? "#333" : "#f5f5f5" }} data-animate="up">
        <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "30px", color: isDarkMode ? "#fff" : "#333" }}>
          Our choice of<br />popular real estate
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          marginBottom: "40px",
        }}>
          {properties.slice(0, 6).map((property, idx) => (
            <div 
              key={property.id} 
              onClick={handlePropertyClick}
              style={{
                backgroundColor: isDarkMode ? "#444" : "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                animation: `fadeInUp 0.8s ease-out ${idx * 0.1}s backwards`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{
                height: "250px",
                backgroundColor: "#e0e0e0",
                position: "relative",
                overflow: "hidden",
              }}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
                <span style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: property.type === "Sell" ? "#333" : "#ff6b35",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}>
                  {property.type}
                </span>
              </div>
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "12px", color: isDarkMode ? "#aaa" : "#999", marginBottom: "8px" }}>
                  📍 {property.location}
                </p>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: isDarkMode ? "#fff" : "#333" }}>
                  {property.title}
                </h3>
                <p style={{ fontSize: "14px", color: isDarkMode ? "#bbb" : "#666", marginBottom: "16px" }}>
                  Lorem ipsum dolor sit amet, wisi nemore fastidii at vis, eos equidem ammodum
                </p>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "#eee"}`,
                }}>
                  <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ff6b35" }}>
                    ${property.price}
                  </span>
                  <div style={{ fontSize: "12px", color: isDarkMode ? "#aaa" : "#999" }}>
                    {property.sqm} • {property.beds}b • {property.baths}b
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button style={{
            backgroundColor: "#ff6b35",
            color: "white",
            padding: "12px 30px",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "500",
          }}>
            Browse More Properties
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "80px 60px", backgroundColor: isDarkMode ? "#333" : "white" }} data-animate="up">
        <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "60px", color: isDarkMode ? "#fff" : "#333" }}>
          How it works?<br />Find a perfect home
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
        }}>
          {howItWorks.map((item, idx) => (
            <div key={idx} style={{
              textAlign: "center",
              animation: `fadeInUp 0.8s ease-out ${idx * 0.1}s backwards`,
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "20px",
                transition: "transform 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2) rotate(5deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
              }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: isDarkMode ? "#fff" : "#333" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: isDarkMode ? "#bbb" : "#666", lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services / Enquiry Section */}
      <section
        id="services"
        className="enquiry-section"
        style={{
          backgroundColor: isDarkMode ? "#111" : "#faf7ef",
        }}
        onMouseMove={handleEnquiryMouseMove}
      >
        <div
          className="enquiry-hero"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.08) 100%), url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&h=1200&fit=crop')",
          }}
        >
          <div className="enquiry-hero-overlay" />
          <div className="enquiry-copy" data-animate="left">
            <span className="enquiry-eyebrow">Premium property guidance</span>
            <h2>Discover a new way of living</h2>
            <p>
              Tell us what you need and we’ll match you with the right home, the right area, and the right time to move.
            </p>
            <div className="enquiry-pills">
              <span>Trusted agents</span>
              <span>Fast response</span>
              <span>Personal matching</span>
            </div>
          </div>

          <div
            className="enquiry-card"
            data-animate="right"
            style={{
              backgroundColor: isDarkMode ? "rgba(24,24,24,0.92)" : "rgba(255,255,255,0.96)",
              boxShadow: `0 24px 80px rgba(0,0,0,${isDarkMode ? 0.45 : 0.18})`,
              border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)"}`,
              backgroundImage: `radial-gradient(circle at ${enquiryGlow.x}% ${enquiryGlow.y}%, rgba(255,107,53,0.18), transparent 32%)`,
            }}
          >
            <h3>Make an enquiry</h3>
            <p>
              Save your time and easily rent or sell your property with the lowest commission on the real estate market.
            </p>
            <form onSubmit={handleFormSubmit} className="enquiry-form">
              <input
                type="text"
                name="name"
                placeholder="Your name*"
                value={formData.name}
                onChange={handleFormChange}
                required
                style={{
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.95)",
                  color: isDarkMode ? "#fff" : "#333",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your email*"
                value={formData.email}
                onChange={handleFormChange}
                required
                style={{
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.95)",
                  color: isDarkMode ? "#fff" : "#333",
                }}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number*"
                value={formData.phone}
                onChange={handleFormChange}
                required
                style={{
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.95)",
                  color: isDarkMode ? "#fff" : "#333",
                }}
              />
              <button type="submit">Make an enquiry</button>
            </form>
          </div>
        </div>
      </section>

      {/* Renovation Section */}
      <section className="renovation-section" style={{ backgroundColor: isDarkMode ? "#fff" : "#fff" }}>
        <div className="renovation-copy" data-animate="left">
          <h2>Our expert will help you make the renovation</h2>
          <div className="renovation-list">
            <div className="renovation-item">
              <div className="renovation-icon">🏠</div>
              <div>
                <h3>Find inspiration</h3>
                <p>Sumo potentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
              </div>
            </div>
            <div className="renovation-item">
              <div className="renovation-icon">📐</div>
              <div>
                <h3>Find architect/designer</h3>
                <p>Sumo potentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
              </div>
            </div>
            <div className="renovation-item">
              <div className="renovation-icon">🎨</div>
              <div>
                <h3>Begin renovation</h3>
                <p>Sumo potentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="renovation-gallery" data-animate="right">
          <div className="renovation-tile renovation-tile--large">
            <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&h=1400&fit=crop" alt="Interior renovation planning" />
          </div>
          <div className="renovation-tile renovation-tile--top">
            <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=900&fit=crop" alt="Renovation team meeting" />
          </div>
          <div className="renovation-tile renovation-tile--bottom">
            <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=900&fit=crop" alt="Renovated room" />
          </div>
        </div>
      </section>

      {/* Loan Options Showcase */}
      <section className="loan-showcase" data-animate="up">
        <div className="loan-showcase-copy">
          <h2>Explore your home<br />loan options</h2>
          <p>
            Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix primis viderere vituperatoribus. In corpora argumentum. Vix ferri dicam contentiones ne, ex appetere salutatus
          </p>
          <button className="loan-showcase-button">Search Property</button>
        </div>

        <div className="loan-showcase-media" aria-hidden="true">
          <div className="loan-showcase-frame" />
          <img
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1400&h=1100&fit=crop"
            alt="Home loan consultation and property review"
            className="loan-showcase-image"
          />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" style={{ padding: "80px 60px", backgroundColor: isDarkMode ? "#333" : "white" }} data-animate="up">
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "60px", color: isDarkMode ? "#fff" : "#333" }}>
          See what others<br />said about us
        </h2>
        <div style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}>
          <div ref={carouselRef} style={{
            display: "flex",
            gap: "30px",
            overflowX: "hidden",
            paddingBottom: "20px",
          }}>
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div key={idx} style={{
                flex: "0 0 calc(25% - 22.5px)",
                minWidth: "300px",
                padding: "24px",
                backgroundColor: isDarkMode ? "#444" : "white",
                border: `1px solid ${isDarkMode ? "#555" : "#eee"}`,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease-out",
                transform: `translateX(${-testimonialsOffset * 100}%)`,
                animation: `scroll-carousel 40s linear infinite`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = isDarkMode ? "0 10px 25px rgba(255, 255, 255, 0.1)" : "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
              }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "12px",
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "16px", color: isDarkMode ? "#fff" : "#333" }}>
                      {testimonial.name}
                    </p>
                    <p style={{ fontSize: "12px", color: isDarkMode ? "#aaa" : "#999" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: isDarkMode ? "#bbb" : "#666", lineHeight: 1.6 }}>
                  "{testimonial.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "30px",
        }}>
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: testimonialsOffset === idx ? "#ff6b35" : "#ddd",
                cursor: "pointer",
                transition: "background-color 0.3s ease-out",
              }}
              onClick={() => setTestimonialsOffset(idx)}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=800&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        padding: "80px 60px",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }} />
        <div style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          color: "white",
        }} data-animate="left">
          <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "20px" }}>
            Find a home that<br />truly suits you.
          </h2>
          <p style={{
            fontSize: "16px",
            marginBottom: "20px",
            opacity: 0.9,
          }}>
            * Feugait scriporem qui eq, quo ammodum lorem.
          </p>
        </div>
        <div style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: isDarkMode ? "#222" : "white",
          padding: "40px",
          borderRadius: "8px",
          minWidth: "400px",
          border: isDarkMode ? "1px solid #444" : "none",
        }} data-animate="right">
          <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", color: isDarkMode ? "#fff" : "#333" }}>
            Sign to newsletter
          </h3>
          <p style={{
            fontSize: "14px",
            color: isDarkMode ? "#bbb" : "#666",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}>
            Save your time and easily rent or sell your property with the lowest commission on the real estate market.
          </p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", gap: "8px" }}>
            <input
              type="email"
              placeholder="Your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "12px",
                border: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
                borderRadius: "4px",
                fontSize: "14px",
                backgroundColor: isDarkMode ? "#333" : "#fff",
                color: isDarkMode ? "#fff" : "#333",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#ff6b35",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Sign up
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
