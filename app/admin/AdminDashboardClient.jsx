"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    try {
      const activeSession = JSON.parse(localStorage.getItem("hrms_active_user") || "null");
      const isLoggedIn = localStorage.getItem("hrms_is_logged_in") === "true";

      if (!isLoggedIn || activeSession?.role !== "admin") {
        router.replace("/login");
        return;
      }
    } catch {
      router.replace("/login");
      return;
    }

    setAccessChecked(true);
  }, [router]);

  const stats = useMemo(() => {
    const usersCount = userRecords.length;
    const listingsCount = listingRecords.length;
    const flaggedListings = listingRecords.filter(
      (listing) => listing.status === "Flagged",
    ).length;

    return { usersCount, listingsCount, flaggedListings };
  }, []);

  if (!accessChecked) {
    return (
      <section className="section-block admin-section">
        <div className="page-container">
          <p>Checking admin access...</p>
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

        <div className="admin-panel-wrap">
          <article className="admin-panel">
            <div className="admin-panel-head">
              <h2>Manage Users</h2>
              <p>{userRecords.length} users in this preview</p>
            </div>
            <div className="admin-list-grid">
              {userRecords.map((user) => (
                <div key={user.id} className="admin-record-card">
                  <div className="admin-list-row">
                    <h3>{user.fullName}</h3>
                    <span className="admin-status-chip">{user.status}</span>
                  </div>
                  <p className="admin-record-text">{user.email}</p>
                  <p className="admin-record-text">Role: {user.role}</p>
                  <div className="admin-record-actions">
                    <button type="button">Block</button>
                    <button type="button">Remove</button>
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
              {listingRecords.map((listing) => (
                <div key={listing.id} className="admin-record-card">
                  <div className="admin-list-row">
                    <h3>{listing.title}</h3>
                    <span className="admin-status-chip">{listing.status}</span>
                  </div>
                  <p className="admin-record-text">Owner: {listing.owner}</p>
                  <p className="admin-record-text">Location: {listing.location}</p>
                  <div className="admin-record-actions">
                    <button type="button" className="admin-approve-btn">
                      Approve
                    </button>
                    <button type="button" className="admin-remove-btn">
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
