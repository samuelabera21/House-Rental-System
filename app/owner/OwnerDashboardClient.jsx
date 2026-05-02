"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getActiveUser } from "../../lib/auth";

const ownerListings = [
  {
    id: "L-101",
    title: "Modern Family Apartment",
    location: "Bole, Addis Ababa",
    price: "$1,200 / month",
    status: "Active",
    rooms: "3 Rooms",
  },
  {
    id: "L-102",
    title: "Compact City Studio",
    location: "Kazanchis, Addis Ababa",
    price: "$780 / month",
    status: "Pending Approval",
    rooms: "1 Room",
  },
  {
    id: "L-103",
    title: "Garden View Villa",
    location: "CMC, Addis Ababa",
    price: "$1,650 / month",
    status: "Active",
    rooms: "4 Rooms",
  },
];

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

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "owner") {
      router.replace("/login");
      return;
    }

    setIsAuthorizing(false);
  }, [router]);

  if (isAuthorizing) {
    return (
      <section className="section-block owner-section">
        <div className="page-container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  const totalListings = ownerListings.length;
  const totalRequests = incomingRequests.length;
  return (
    <section className="section-block owner-section">
      <div className="page-container">
        <div className="owner-header">
          <div>
            <span className="owner-badge">House Owner Dashboard</span>
            <h1>Manage Your Listings and Rental Requests</h1>
            <p>
              View your property listings, monitor renter interest, and take
              action on incoming requests from one place.
            </p>
          </div>
          <button type="button" className="owner-action-btn">
            + Add New Listing
          </button>
        </div>

        <section
          className="owner-summary-grid"
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
        </section>

        <div className="owner-panel-wrap">
          <article className="owner-panel">
            <div className="owner-panel-head">
              <h2>Listings Preview</h2>
              <p>{ownerListings.length} active listings</p>
            </div>
            <div className="owner-list-grid">
              {ownerListings.map((listing) => (
                <div key={listing.id} className="owner-list-card">
                  <div className="owner-list-row">
                    <h3>{listing.title}</h3>
                    <span className="owner-status-chip">{listing.status}</span>
                  </div>
                  <p className="owner-location">{listing.location}</p>
                  <div className="owner-list-meta">
                    <span>{listing.price}</span>
                    <span>{listing.rooms}</span>
                  </div>
                  <div className="owner-list-actions">
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
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
                    <span className="owner-request-state">
                      {request.status}
                    </span>
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