"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveUser } from "../../../lib/auth";

export default function OwnerPendingApprovalPage() {
  const router = useRouter();
  const [activeUser, setActiveUser] = useState(null);

  const isBlocked = String(activeUser?.accountStatus || "").toLowerCase() === "blocked";

  useEffect(() => {
    const user = getActiveUser();

    if (!user || user.role !== "owner") {
      router.replace("/login");
      return;
    }

    if (user.isApproved === true) {
      router.replace("/owner");
      return;
    }

    setActiveUser(user);
  }, [router]);

  return (
    <section className="section-block owner-section">
      <div className="page-container owner-pending-wrap">
        <div className="owner-pending-card">
          <span className="owner-pending-badge">Approval required</span>
          <h1>
            {isBlocked
              ? "Your owner account has been blocked"
              : "Your owner account is waiting for admin approval"}
          </h1>
          <p>
            {isBlocked
              ? `Your registration for ${activeUser?.fullName || activeUser?.name || "your account"} is currently blocked by an administrator. Please contact support or sign in later if this changes.`
              : `We have received your registration for ${activeUser?.fullName || activeUser?.name || "your account"}. An administrator must approve the account before you can access the owner dashboard or add new listings.`}
          </p>
          <div className="owner-pending-note">
            {isBlocked
              ? "Blocked accounts cannot access the owner dashboard until the admin restores access."
              : "Once approved, you can log in normally and create listings without any additional listing approval step."}
          </div>
          <div className="owner-pending-actions">
            <button type="button" className="owner-primary-btn" onClick={() => router.refresh()}>
              Check approval status
            </button>
            <Link href="/login" className="owner-secondary-link">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
