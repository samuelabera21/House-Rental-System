"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileEditor from "../../components/ProfileEditor";
import { getActiveUser } from "../../lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    const activeUser = getActiveUser();

    if (!activeUser || activeUser.role === "admin") {
      router.replace("/login");
      return;
    }

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
      <div className="page-container profile-page-wrap">
        <div className="profile-page-head">
          <span className="hero-badge">Profile Settings</span>
          <h1>Update your account information</h1>
          <p>
            Keep your personal details current from a dedicated profile page.
            Admin accounts are excluded from editing.
          </p>
        </div>

        <ProfileEditor />
      </div>
    </section>
  );
}