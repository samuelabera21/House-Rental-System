"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveUser } from "../../lib/auth";
import { getOwnerListings, saveOwnerListings } from "../../lib/ownerListings";

const incomingRequests = [
  {
    id: "REQ-201",
    renter: "Abel Tadesse",
    listing: "Modern Family Apartment",
    moveInDate: "May 15, 2026",
    status: "Pending",
  },
  {
    id: "REQ-202",
    renter: "Hana Bekele",
    listing: "Garden View Villa",
    moveInDate: "May 22, 2026",
    status: "Pending",
  },
  {
    id: "REQ-203",
    renter: "Liya Solomon",
    listing: "Compact City Studio",
    moveInDate: "June 02, 2026",
    status: "Reviewed",
  },
];

export default function OwnerDashboardClient() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "owner") {
      router.replace("/login");
      return;
    }

    setListings(getOwnerListings());
    setIsAuthorizing(false);
  }, [router]);

  const handleDeleteListing = (listingId) => {
    setListings((prev) => {
      const next = prev.filter((listing) => listing.id !== listingId);
      saveOwnerListings(next);
      return next;
    });
  };

  if (isAuthorizing) {
    return (
      <section className="section-block owner-section">
        <div className="page-container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  const totalListings = listings.length;
  const totalRequests = incomingRequests.length;
  const activeListings = listings.filter(
    (listing) => String(listing.status).toLowerCase() === "active",
  ).length;

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-shell">
        <header className="owner-hero">
          <div className="owner-hero-copy">
            <span className="section-kicker">
              <span className="section-kicker-line" />
              Owner Workspace
            </span>
            <h1>Manage listings and rental requests</h1>
            <p>
              View your property listings, monitor renter interest, and take action on
              incoming requests from one place.
            </p>
          </div>

          <button
            type="button"
            className="owner-action-btn cta-button cta-button-solid"
            onClick={() => router.push("/owner/new-listing")}
          >
            Add New Listing
          </button>
        </header>

        <section className="owner-summary-grid owner-summary-grid-dark" aria-label="Owner summary cards">
          <article className="owner-summary-card">
            <p className="owner-summary-label">Total Listings</p>
            <p className="owner-summary-value">{totalListings}</p>
          </article>
          <article className="owner-summary-card">
            <p className="owner-summary-label">Requests</p>
            <p className="owner-summary-value">{totalRequests}</p>
          </article>
          <article className="owner-summary-card">
            <p className="owner-summary-label">Active Listings</p>
            <p className="owner-summary-value">{activeListings}</p>
          </article>
        </section>

        <div className="owner-panel-wrap owner-panel-wrap-dark">
          <article className="owner-panel">
            <div className="owner-panel-head">
              <h2>Listings Preview</h2>
              <p>{activeListings} active listings</p>
            </div>
            <div className="owner-list-grid">
              {listings.map((listing) => (
                <div key={listing.id} className="owner-list-card">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="owner-listing-thumb"
                  />
                  <div className="owner-list-row">
                    <h3>{listing.title}</h3>
                    <span className="owner-status-chip">{listing.status}</span>
                  </div>
                  <p className="owner-location">{listing.location}</p>
                  <div className="owner-list-meta">
                    <span>${Number(listing.price).toLocaleString()} / month</span>
                    <span>{listing.rooms} Rooms</span>
                    {listing.propertyType && <span>{listing.propertyType}</span>}
                  </div>
                  {listing.amenities && listing.amenities.length > 0 && (
                    <p className="owner-amenities">
                      Amenities: {listing.amenities.join(", ")}
                    </p>
                  )}
                  {listing.furnished && (
                    <p className="owner-furnished">✓ Furnished</p>
                  )}
                  <p className="owner-request-text">{listing.description}</p>
                  <div className="owner-list-actions">
                    <button type="button" disabled>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="owner-panel">
            <div className="owner-panel-head">
              <h2>Incoming Requests</h2>
              <p>{incomingRequests.length} recent requests</p>
            </div>
            <div className="owner-request-list">
              {incomingRequests.map((request) => (
                <div key={request.id} className="owner-request-card">
                  <div className="owner-list-row">
                    <h3>{request.renter}</h3>
                    <span className="owner-request-state">{request.status}</span>
                  </div>
                  <p className="owner-request-text">
                    Requested: <strong>{request.listing}</strong>
                  </p>
                  <p className="owner-request-text">
                    Preferred move-in: {request.moveInDate}
                  </p>
                  <div className="owner-list-actions">
                    <button type="button" className="approve-btn">
                      Accept
                    </button>
                    <button type="button" className="reject-btn">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}