"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileEditor from "../../components/ProfileEditor";
import { getActiveUser } from "../../lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [backHref, setBackHref] = useState("/owner");

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role === "admin") {
      router.replace("/login");
      return;
    }

    setBackHref(activeUser.role === "owner" ? "/owner" : "/Renter_ui");
    setIsAuthorizing(false);
  }, [router]);

  if (isAuthorizing) {
    return (
      <section className="section-block profile-page-section">
        <div className="page-container">
          <p>Checking authentication...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-block profile-page-section">
      <div className="page-container profile-page-wrap profile-shell">
        <header className="profile-page-head profile-hero">
          <span className="section-kicker">
            <span className="section-kicker-line" />
            Profile Settings
          </span>
          <div className="profile-page-actions">
            <Link href={backHref} className="profile-back-link">
              Back to dashboard
            </Link>
          </div>
          <h1>Update your account information</h1>
          <p>
            Keep your personal details current from a dedicated profile page.
            Admin accounts are excluded from editing.
          </p>
        </header>

        <ProfileEditor />
      </div>
    </section>
  );
}