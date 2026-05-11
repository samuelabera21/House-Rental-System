"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser, getMergedAccounts, updateStoredUserApproval } from "../../lib/auth";

function toDisplayName(user) {
  const value = user.fullName || user.name || user.email || "Unknown";
  return String(value)
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusTone(status) {
  const normalized = String(status || "").toLowerCase();

  if (normalized.includes("approved") || normalized.includes("active") || normalized.includes("verified")) {
    return "success";
  }

  if (normalized.includes("pending")) {
    return "warning";
  }

  if (normalized.includes("blocked") || normalized.includes("suspended")) {
    return "danger";
  }

  return "neutral";
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [accounts, setAccounts] = useState([]);
  const [refreshTick, setRefreshTick] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "admin") {
      router.replace("/login");
      return;
    }

    setAccounts(getMergedAccounts());
    setIsAuthorizing(false);
  }, [router, refreshTick]);

  const stats = useMemo(() => {
    const totalAccounts = accounts.length;
    const pendingOwners = accounts.filter(
      (account) => account.role === "owner" && account.accountStatus === "Pending Approval",
    ).length;
    const approvedOwners = accounts.filter(
      (account) => account.role === "owner" && account.accountStatus === "Approved",
    ).length;

    return {
      totalAccounts,
      pendingOwners,
      approvedOwners,
    };
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesQuery =
        !query ||
        [account.fullName, account.email, account.role, account.accountStatus]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      const matchesRole =
        roleFilter === "all" ? true : String(account.role).toLowerCase() === roleFilter;

      const matchesStatus =
        statusFilter === "all"
          ? true
          : String(account.accountStatus || "").toLowerCase() === statusFilter;

      return matchesQuery && matchesRole && matchesStatus;
    });
  }, [accounts, searchTerm, roleFilter, statusFilter]);

  const pendingOwners = useMemo(
    () =>
      filteredAccounts.filter(
        (account) => account.role === "owner" && account.accountStatus === "Pending Approval",
      ),
    [filteredAccounts],
  );

  function refreshAccounts() {
    setAccounts(getMergedAccounts());
    setRefreshTick((value) => value + 1);
  }

  function approveOwner(email) {
    updateStoredUserApproval(email, {
      accountStatus: "Approved",
      isApproved: true,
      approvalNote: "Approved by admin.",
      reviewedBy: getActiveUser()?.email || "admin",
    });
    refreshAccounts();
  }

  function holdOwner(email) {
    updateStoredUserApproval(email, {
      accountStatus: "Pending Approval",
      isApproved: false,
      approvalNote: "Returned to pending approval by admin.",
      reviewedBy: getActiveUser()?.email || "admin",
    });
    refreshAccounts();
  }

  function blockAccount(email) {
    updateStoredUserApproval(email, {
      accountStatus: "Blocked",
      isApproved: false,
      approvalNote: "Blocked by admin.",
      reviewedBy: getActiveUser()?.email || "admin",
    });
    refreshAccounts();
  }

  function unblockOwner(email) {
    updateStoredUserApproval(email, {
      accountStatus: "Approved",
      isApproved: true,
      approvalNote: "Unblocked and approved by admin.",
      reviewedBy: getActiveUser()?.email || "admin",
    });
    refreshAccounts();
  }

  function openOwnerDetails(account) {
    setSelectedOwner(account);
  }

  function closeOwnerDetails() {
    setSelectedOwner(null);
  }

  if (isAuthorizing) {
    return (
      <section className="section-block admin-section">
        <div className="page-container admin-shell">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block admin-section admin-console">
      <div className="page-container admin-shell">
        <header className="admin-hero">
          <div className="admin-hero-copy">
            <span className="admin-kicker">Administrator Console</span>
            <h1>Accounts & approvals</h1>
            <p>Review owners and users from one clean workspace.</p>
            <div className="admin-hero-actions">
              <button type="button" className="admin-primary-btn" onClick={refreshAccounts}>
                Refresh
              </button>
            </div>
            <div className="admin-mini-stats">
              <span>{stats.totalAccounts} accounts</span>
              <span>{stats.pendingOwners} pending owners</span>
              <span>{stats.approvedOwners} approved owners</span>
            </div>
          </div>
        </header>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <h2>Accounts</h2>
            <p>{filteredAccounts.length}</p>
          </div>
          <div className="admin-search-row">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search accounts"
            />
            <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
              <option value="all">All roles</option>
              <option value="owner">Owners</option>
              <option value="renter">Renters</option>
              <option value="admin">Admins</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="pending approval">Pending</option>
              <option value="approved">Approved</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="admin-card-stack compact admin-simple-list">
            {filteredAccounts.map((account) => (
              <article key={account.email} className="admin-record-card admin-user-card admin-user-row">
                <div className="admin-user-main">
                  <h3>{toDisplayName(account)}</h3>
                  <p className="admin-record-text">{account.email}</p>
                </div>
                <span className={`admin-status-chip tone-${getStatusTone(account.accountStatus || account.role)}`}>
                  {account.accountStatus || (account.role === "admin" ? "Active" : "Unknown")}
                </span>
                <div className="admin-record-actions admin-user-actions">
                  <button type="button" className="admin-secondary-btn" onClick={() => openOwnerDetails(account)}>
                    View detail
                  </button>
                  {account.role === "owner" && account.accountStatus !== "Approved" ? (
                    <button type="button" className="admin-primary-btn" onClick={() => approveOwner(account.email)}>
                      Approve
                    </button>
                  ) : null}
                  {account.role === "owner" && account.accountStatus === "Approved" ? (
                    <button type="button" className="admin-secondary-btn" onClick={() => holdOwner(account.email)}>
                      Pending
                    </button>
                  ) : null}
                  <button type="button" className="admin-danger-btn" onClick={() => blockAccount(account.email)}>
                    Block
                  </button>
                  {account.accountStatus === "Blocked" ? (
                    <button type="button" className="admin-primary-btn" onClick={() => unblockOwner(account.email)}>
                      Unblock
                    </button>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedOwner && (
          <div className="admin-modal-overlay" onClick={closeOwnerDetails}>
            <div className="admin-modal-card" onClick={(event) => event.stopPropagation()}>
              <div className="admin-modal-head">
                <div>
                  <span className="admin-kicker">Owner detail</span>
                  <h2>{toDisplayName(selectedOwner)}</h2>
                </div>
                <button type="button" className="admin-modal-close" onClick={closeOwnerDetails}>
                  ×
                </button>
              </div>

              <div className="admin-modal-grid">
                <div>
                  <span>Email</span>
                  <strong>{selectedOwner.email}</strong>
                </div>
                <div>
                  <span>Phone</span>
                  <strong>{selectedOwner.phone || "-"}</strong>
                </div>
                <div>
                  <span>Address</span>
                  <strong>{selectedOwner.address || "-"}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{selectedOwner.accountStatus || selectedOwner.role}</strong>
                </div>
              </div>

              <div className="admin-modal-note">
                {selectedOwner.approvalNote || "No admin note available."}
              </div>

              <div className="admin-record-actions">
                {selectedOwner.role === "owner" && selectedOwner.accountStatus !== "Approved" ? (
                  <button type="button" className="admin-primary-btn" onClick={() => approveOwner(selectedOwner.email)}>
                    Approve owner
                  </button>
                ) : null}
                <button type="button" className="admin-danger-btn" onClick={() => blockAccount(selectedOwner.email)}>
                  Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
