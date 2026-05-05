"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import HouseCard from "../components/HouseCard";
import SearchBar from "../components/SearchBar";
import { featuredHouses } from "../lib/dummyData";

const heroRoles = ["Renter", "Owner", "Administrator"];

const rentalStats = [
  { value: "6+", label: "Featured homes", detail: "Verified listings across Addis Ababa." },
  { value: "3", label: "User roles", detail: "Dedicated flows for renters, owners, and admins." },
  { value: "24/7", label: "Access", detail: "Browse, compare, and request a home anytime." },
];

export default function HomePage() {
  const [locationQuery, setLocationQuery] = useState("");
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);

  const visibleHouses = useMemo(() => {
    if (!locationQuery.trim()) return featuredHouses;

    return featuredHouses.filter((house) =>
      house.location.toLowerCase().includes(locationQuery.trim().toLowerCase())
    );
  }, [locationQuery]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home-page-shell">
        <section className="hero-section hero-stage" id="home">
          <div className="hero-backdrop" aria-hidden="true">
            <div className="hero-backdrop-image hero-image-one" />
            <div className="hero-backdrop-image hero-image-two" />
            <div className="hero-backdrop-glow" />
          </div>

          <div className="page-container hero-grid hero-grid-dark">
            <div className="hero-copy">
              <span className="hero-badge blur-in">Trusted Rental Platform</span>
              <h1 className="hero-title name-reveal">
                Find the house that feels like home.
              </h1>
              <p className="hero-subtitle blur-in">
                Discover verified homes, compare prices, and connect with owners in a
                few clicks. House Rental Management System helps renters, owners, and
                administrators stay organized in one place.
              </p>

              <p className="hero-role-line blur-in" key={heroRoleIndex}>
                A <span className="hero-role-word">{heroRoles[heroRoleIndex]}</span> lives
                in one platform.
              </p>

              <SearchBar onSearch={setLocationQuery} />

              <div className="hero-actions blur-in">
                <Link href="#featured" className="cta-button cta-button-solid">
                  Browse homes
                </Link>
                <Link href="#about" className="cta-button cta-button-outline">
                  Learn more
                </Link>
              </div>
            </div>

            <div className="hero-visual hero-visual-dark" aria-hidden="true">
              <div className="hero-card">
                <p className="hero-card-title">Fast Discovery</p>
                <p className="hero-card-text">
                  Search by location and explore listings instantly.
                </p>
              </div>
              <div className="hero-card">
                <p className="hero-card-title">Verified Listings</p>
                <p className="hero-card-text">
                  Owner and admin flows keep house data reliable.
                </p>
              </div>
              <div className="hero-card">
                <p className="hero-card-title">Role-Based Workflow</p>
                <p className="hero-card-text">
                  Built for renters, owners, and administrators.
                </p>
              </div>
            </div>
          </div>

          <div className="scroll-indicator" aria-hidden="true">
            <span className="scroll-indicator-text">Scroll</span>
            <span className="scroll-indicator-line">
              <span className="scroll-indicator-dot animate-scroll-down" />
            </span>
          </div>
        </section>

        <section className="section-block section-dark" id="featured">
          <div className="page-container">
            <div className="section-head section-head-dark">
              <div>
                <span className="section-kicker">
                  <span className="section-kicker-line" />
                  Featured Houses
                </span>
                <h2>
                  Featured <em>homes</em>
                </h2>
                <p>
                  Curated rental homes from popular neighborhoods, arranged in a bento
                  grid to keep browsing quick.
                </p>
              </div>

              <Link href="#highlights" className="section-link">
                View highlights
              </Link>
            </div>

            {visibleHouses.length > 0 ? (
              <div className="featured-bento-grid">
                {visibleHouses.slice(0, 4).map((house, index) => (
                  <div
                    key={house.id}
                    className={`featured-bento-item featured-bento-item-${index + 1}`}
                  >
                    <HouseCard house={house} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state dark-empty-state">
                <h3>No listings found</h3>
                <p>Try another location to see matching houses.</p>
              </div>
            )}
          </div>
        </section>

        <section className="section-block section-dark section-highlight" id="highlights">
          <div className="page-container">
            <div className="section-head section-head-dark">
              <div>
                <span className="section-kicker">
                  <span className="section-kicker-line" />
                  Latest Listings
                </span>
                <h2>
                  Recent <em>houses</em>
                </h2>
                <p>
                  A quick glance at the most recent homes in the system, with price and
                  neighborhood details front and center.
                </p>
              </div>
            </div>

            <div className="listing-pill-grid">
              {visibleHouses.slice(0, 4).map((house) => (
                <article key={house.id} className="listing-pill">
                  <img src={house.image} alt={`${house.location} house`} loading="lazy" />
                  <div>
                    <p className="listing-pill-title">{house.location}</p>
                    <p className="listing-pill-copy">${house.price.toLocaleString()} / month</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block section-stats" id="about">
          <div className="page-container about-wrap about-wrap-dark">
            <div className="about-copy">
              <span className="section-kicker">
                <span className="section-kicker-line" />
                About
              </span>
              <h2>About House Rental Management System</h2>
              <p>
                This platform connects renters searching for quality homes, owners
                managing their listings, and administrators maintaining platform
                integrity. The system streamlines discovery, rental requests, and
                communication to create a smoother rental journey for everyone.
              </p>
              <p>
                Use the search bar above to narrow homes by location, then move into the
                renter, owner, or admin flows that match your role.
              </p>
            </div>

            <div className="stats-grid" aria-label="Platform highlights">
              {rentalStats.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                  <span>{item.detail}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
