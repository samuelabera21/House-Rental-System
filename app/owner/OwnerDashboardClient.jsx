"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser } from "../../lib/auth";
import { getOwnerListings, saveOwnerListings } from "../../lib/ownerListings";
import { getRenterRequests } from "../../lib/renterRequests";
import OwnerPageTabs from "./OwnerPageTabs";

export default function OwnerDashboardClient() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [requests, setRequests] = useState([]);

  const avatarLabel = useMemo(() => {
    const fullName = String(activeUser?.fullName || "").trim();

    if (!fullName) {
      return "O";
    }

    return fullName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [activeUser]);

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "owner") {
      router.replace("/login");
      return;
    }

    if (activeUser.isApproved === false) {
      router.replace("/owner/pending-approval");
      return;
    }

    setActiveUser(activeUser);
    setListings(getOwnerListings());
    setRequests(getRenterRequests());
    setIsAuthorizing(false);
  }, [router]);

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === "pending"),
    [requests],
  );

  const requestsByListingKey = useMemo(() => {
    return requests.reduce((accumulator, request) => {
      const requestKey =
        request.listingKey || `${request.listingTitle}::${request.listingLocation}`;
      accumulator[requestKey] = accumulator[requestKey] || [];
      accumulator[requestKey].push(request);
      return accumulator;
    }, {});
  }, [requests]);

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
  const totalRequests = requests.length;
  const activeListings = listings.filter(
    (listing) => String(listing.status).toLowerCase() === "active",
  ).length;

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-shell">
        <header className="owner-hero owner-hero-dashboard">
          <div className="owner-hero-copy">
            <span className="section-kicker">
              <span className="section-kicker-line" />
              Owner Workspace
            </span>
            <h1>Manage your listings with clarity</h1>
            <p>
              Track performance, review requests, and keep your properties organized.
            </p>
            <OwnerPageTabs activeHref="/owner" />
          </div>

          <div className="owner-dashboard-actions">
            <button
              type="button"
              className="owner-request-notification"
              onClick={() => router.push("/owner/requests")}
            >
              <span className="owner-request-notification-dot" aria-hidden="true" />
              <span>Requests</span>
              <strong>{pendingRequests.length}</strong>
            </button>
            <p className="owner-dashboard-actions-note">
              Open the request inbox to accept or reject renter requests.
            </p>
          </div>
        </header>

        <section
          className="owner-summary-grid owner-summary-grid-dark"
          aria-label="Owner summary cards"
        >
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

        <article className="owner-panel owner-listing-panel">
          <div className="owner-panel-head">
            <div>
              <h2>Listings Preview</h2>
              <p>Manage your houses, edit details, or remove a listing when needed.</p>
            </div>
            <button
              type="button"
              className="owner-request-link"
              onClick={() => router.push("/owner/requests")}
            >
              View Requests
            </button>
          </div>

          <div className="owner-list-grid">
            {listings.map((listing) => {
              const listingKey = `${listing.title || ""}::${listing.location || ""}`;
              const matchingRequests = requestsByListingKey[listingKey] || [];
              const pendingCount = matchingRequests.filter(
                (request) => request.status === "pending",
              ).length;

              return (
                <div key={listing.id} className="owner-list-card">
                  {pendingCount > 0 && (
                    <span className="owner-request-badge">
                      {pendingCount} request{pendingCount === 1 ? "" : "s"}
                    </span>
                  )}
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
                  {listing.furnished && <p className="owner-furnished">✓ Furnished</p>}
                  <p className="owner-request-text">{listing.description}</p>
                  <div className="owner-list-actions">
                    <button
                      type="button"
                      className="owner-list-edit-btn"
                      onClick={() => router.push(`/owner/edit/${listing.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="owner-list-delete-btn"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
