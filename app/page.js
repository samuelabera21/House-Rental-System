"use client";

import { useMemo, useState } from "react";
import HouseCard from "../components/HouseCard";
import SearchBar from "../components/SearchBar";
import { featuredHouses } from "../lib/dummyData";

export default function HomePage() {
  const [locationQuery, setLocationQuery] = useState("");

  const visibleHouses = useMemo(() => {
    if (!locationQuery.trim()) return featuredHouses;

    return featuredHouses.filter((house) =>
      house.location.toLowerCase().includes(locationQuery.trim().toLowerCase())
    );
  }, [locationQuery]);

  return (
    <div>
      <section className="hero-section">
        <div className="page-container hero-grid">
          <div>
            <span className="hero-badge">Trusted Rental Platform</span>
            <h1 className="hero-title">Find Your Perfect Rental House Easily</h1>
            <p className="hero-subtitle">
              Discover verified homes, compare prices, and connect with owners in a
              few clicks. House Rental Management System helps renters, owners, and
              administrators stay organized in one place.
            </p>
            <SearchBar onSearch={setLocationQuery} />
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card">
              <p className="hero-card-title">Fast Discovery</p>
              <p className="hero-card-text">Search by location and explore listings instantly.</p>
            </div>
            <div className="hero-card">
              <p className="hero-card-title">Verified Listings</p>
              <p className="hero-card-text">Owner and admin flows keep house data reliable.</p>
            </div>
            <div className="hero-card">
              <p className="hero-card-title">Role-Based Workflow</p>
              <p className="hero-card-text">Built for renters, owners, and administrators.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="featured">
        <div className="page-container">
          <div className="section-head">
            <h2>Featured Houses</h2>
            <p>Curated rental homes from popular neighborhoods.</p>
          </div>

          {visibleHouses.length > 0 ? (
            <div className="house-grid">
              {visibleHouses.slice(0, 6).map((house) => (
                <HouseCard key={house.id} house={house} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No listings found</h3>
              <p>Try another location to see matching houses.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-block section-about" id="about">
        <div className="page-container about-wrap">
          <div>
            <h2>About House Rental Management System</h2>
            <p>
              This platform connects renters searching for quality homes, owners
              managing their listings, and administrators maintaining platform
              integrity. The system streamlines discovery, rental requests, and
              communication to create a smoother rental journey for everyone.
            </p>
          </div>
          <div className="about-points">
            <div className="about-point">Smart house search and listing discovery</div>
            <div className="about-point">Role-specific dashboards and workflows</div>
            <div className="about-point">Scalable architecture for team development</div>
          </div>
        </div>
      </section>
    </div>
  );
}
