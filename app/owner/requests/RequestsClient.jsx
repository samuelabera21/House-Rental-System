"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser } from "../../../lib/auth";
import { getRenterRequests, updateRenterRequestStatus } from "../../../lib/renterRequests";
import OwnerPageTabs from "../OwnerPageTabs";

export default function RequestsClient() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role !== "owner") {
      router.replace("/login");
      return;
    }

    setRequests(getRenterRequests());
    setIsAuthorizing(false);
  }, [router]);

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === "pending"),
    [requests],
  );

  const sortedRequests = useMemo(() => {
    return [...requests].sort((left, right) => {
      if (left.status === right.status) {
        return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      }

      if (left.status === "pending") return -1;
      if (right.status === "pending") return 1;
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }, [requests]);

  const handleStatusChange = (requestId, status) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );
    updateRenterRequestStatus(requestId, status);
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

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-shell">
        <header className="owner-hero owner-requests-hero">
          <div className="owner-hero-copy">
            <span className="section-kicker">
              <span className="section-kicker-line" />
              Request Inbox
            </span>
            <h1>Review renter requests</h1>
            <p>
              Accept or reject requests here. House cards stay on the dashboard, while
              requests remain in this inbox.
            </p>
            <OwnerPageTabs activeHref="/owner/requests" />
          </div>
          <button type="button" className="owner-secondary-btn" onClick={() => router.push("/owner")}>
            Back to Dashboard
          </button>
        </header>

        <section className="owner-summary-grid owner-summary-grid-dark" aria-label="Request summary cards">
          <article className="owner-summary-card">
            <p className="owner-summary-label">Pending Requests</p>
            <p className="owner-summary-value">{pendingRequests.length}</p>
          </article>
          <article className="owner-summary-card">
            <p className="owner-summary-label">Total Requests</p>
            <p className="owner-summary-value">{requests.length}</p>
          </article>
          <article className="owner-summary-card">
            <p className="owner-summary-label">Reviewed</p>
            <p className="owner-summary-value">
              {requests.filter((request) => request.status !== "pending").length}
            </p>
          </article>
        </section>

        <article className="owner-panel owner-request-panel">
          <div className="owner-panel-head">
            <div>
              <h2>Incoming Requests</h2>
              <p>Each request is tied to a listing and can be accepted or rejected.</p>
            </div>
            <p>{pendingRequests.length} pending</p>
          </div>

          <div className="owner-request-list">
            {sortedRequests.map((request) => (
              <div key={request.id} className="owner-request-card">
                <div className="owner-list-row">
                  <h3>{request.renterName}</h3>
                  <span className={`owner-request-state owner-request-state-${request.status}`}>
                    {request.status}
                  </span>
                </div>
                <p className="owner-request-text">
                  Requested: <strong>{request.listingTitle}</strong>
                </p>
                <p className="owner-request-text">{request.listingLocation}</p>
                <p className="owner-request-text">
                  Preferred move-in: {new Date(request.moveInDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                {request.message && <p className="owner-request-message">{request.message}</p>}
                <div className="owner-list-actions">
                  {request.status === "pending" ? (
                    <>
                      <button type="button" className="approve-btn" onClick={() => handleStatusChange(request.id, "accepted")}>
                        Accept
                      </button>
                      <button type="button" className="reject-btn" onClick={() => handleStatusChange(request.id, "rejected")}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="owner-request-review-note">
                      This request was {request.status}.
                    </span>
                  )}
                </div>
              </div>
            ))}
            {sortedRequests.length === 0 && (
              <div className="owner-empty-state">No requests yet.</div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
