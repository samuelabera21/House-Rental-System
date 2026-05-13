"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser } from "../../lib/auth";

const userRecords = [
  {
    id: "U-301",
    fullName: "Meklit Abebe",
    email: "meklit@example.com",
    role: "renter",
    status: "Active",
  },
  {
    id: "U-302",
    fullName: "Dawit Mulu",
    email: "dawit@example.com",
    role: "owner",
    status: "Pending Verification",
  },
  {
    id: "U-303",
    fullName: "Rahel Tesema",
    email: "rahel@example.com",
    role: "owner",
    status: "Blocked",
  },
];

const listingRecords = [
  {
    id: "AL-401",
    title: "2 Bedroom Condo",
    owner: "Dawit Mulu",
    location: "Bole, Addis Ababa",
    status: "Pending Approval",
  },
  {
    id: "AL-402",
    title: "Family Villa",
    owner: "Rahel Tesema",
    location: "CMC, Addis Ababa",
    status: "Approved",
  },
  {
    id: "AL-403",
    title: "Shared Studio",
    owner: "Yonas Kebede",
    location: "Piassa, Addis Ababa",
    status: "Flagged",
  },
];

export default function AdminDashboardClient() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [users, setUsers] = useState(userRecords);
  const [listings, setListings] = useState(listingRecords);
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "admin") {
      router.replace("/login");
      return;
    }

    setIsAuthorizing(false);
  }, [router]);

  const showAdminMessage = (message) => {
    setAdminMessage(message);
    window.setTimeout(() => setAdminMessage(""), 4000);
  };

  const handleReviewFlaggedListings = () => {
    const flaggedCount = listings.filter(
      (listing) => listing.status === "Flagged",
    ).length;

    showAdminMessage(
      flaggedCount > 0
        ? `${flaggedCount} flagged listing(s) awaiting review.`
        : "No flagged listings are pending review.",
    );
  };

  const handleSendAnnouncement = () => {
    showAdminMessage("System announcement sent to all active users.");
  };

  const handleBlockUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: "Blocked" }
          : user,
      ),
    );
    showAdminMessage("User has been blocked.");
  };

  const handleRemoveUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    showAdminMessage("User removed from the system.");
  };

  const handleApproveListing = (listingId) => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === listingId
          ? { ...listing, status: "Approved" }
          : listing,
      ),
    );
    showAdminMessage("Listing approved.");
  };

  const handleRemoveListing = (listingId) => {
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== listingId),
    );
    showAdminMessage("Listing removed from the queue.");
  };

  const stats = useMemo(() => {
    const usersCount = users.length;
    const listingsCount = listings.length;
    const flaggedListings = listings.filter(
      (listing) => listing.status === "Flagged",
    ).length;

    return { usersCount, listingsCount, flaggedListings };
  }, [users, listings]);

  if (isAuthorizing) {
    return (
      <section className="section-block admin-section">
        <div className="page-container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block admin-section">
      <div className="page-container">
        <div className="admin-header">
          <div>
            <span className="admin-badge">Administrator Console</span>
            <h1>System Integrity and Platform Control</h1>
            <p>
              Monitor system metrics, moderate listings, and manage user activity
              from a single admin workspace.
            </p>
          </div>
          <img
            className="admin-header-image"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=720&q=80"
            alt="Admin dashboard overview"
          />
        </div>

        <section className="admin-summary-grid" aria-label="Admin summary cards">
          <article className="admin-summary-card">
            <p className="admin-summary-label">Total Users</p>
            <p className="admin-summary-value">{stats.usersCount}</p>
          </article>
          <article className="admin-summary-card">
            <p className="admin-summary-label">Total Listings</p>
            <p className="admin-summary-value">{stats.listingsCount}</p>
          </article>
          <article className="admin-summary-card">
            <p className="admin-summary-label">Flagged Listings</p>
            <p className="admin-summary-value admin-danger-value">{stats.flaggedListings}</p>
          </article>
        </section>

        {adminMessage && (
          <section className="admin-notification-banner">
            <p>{adminMessage}</p>
          </section>
        )}

        <section className="admin-quick-actions-grid" aria-label="Admin quick actions">
          <article className="admin-summary-card admin-action-card">
            <p className="admin-summary-label">Quick Actions</p>
            <div className="admin-action-list">
              <button type="button" onClick={handleReviewFlaggedListings}>
                Review flagged listings
              </button>
              <button type="button" onClick={handleSendAnnouncement}>
                Send system announcement
              </button>
            </div>
          </article>
          <article className="admin-summary-card admin-alert-card">
            <p className="admin-summary-label">Recent Alerts</p>
            <p className="admin-alert-copy">
              1 listing flagged, 2 new owner verifications pending, and 0 urgent reports.
            </p>
          </article>
        </section>

        <div className="admin-panel-wrap">
          <article className="admin-panel">
            <div className="admin-panel-head">
              <h2>Manage Users</h2>
              <p>{userRecords.length} users in this preview</p>
            </div>
            <div className="admin-list-grid">
              {users.map((user) => (
                <div key={user.id} className="admin-record-card">
                  <div className="admin-list-row">
                    <h3>{user.fullName}</h3>
                    <span className="admin-status-chip">{user.status}</span>
                  </div>
                  <p className="admin-record-text">{user.email}</p>
                  <p className="admin-record-text">Role: {user.role}</p>
                  <div className="admin-record-actions">
                    <button
                      type="button"
                      onClick={() => handleBlockUser(user.id)}
                      disabled={user.status === "Blocked"}
                    >
                      {user.status === "Blocked" ? "Blocked" : "Block"}
                    </button>
                    <button type="button" onClick={() => handleRemoveUser(user.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="admin-panel-head">
              <h2>Manage Listings</h2>
              <p>{listingRecords.length} listing records</p>
            </div>
            <div className="admin-list-grid">
              {listings.map((listing) => (
                <div key={listing.id} className="admin-record-card">
                  <div className="admin-list-row">
                    <h3>{listing.title}</h3>
                    <span className="admin-status-chip">{listing.status}</span>
                  </div>
                  <p className="admin-record-text">Owner: {listing.owner}</p>
                  <p className="admin-record-text">Location: {listing.location}</p>
                  <div className="admin-record-actions">
                    <button
                      type="button"
                      className="admin-approve-btn"
                      onClick={() => handleApproveListing(listing.id)}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => handleRemoveListing(listing.id)}
                    >
                      Remove
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
