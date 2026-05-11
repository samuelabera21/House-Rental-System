"use client";

import Link from "next/link";

const OWNER_TABS = [
  { href: "/owner", label: "Dashboard" },
  { href: "/owner/new-listing", label: "Add Listing" },
];

export default function OwnerPageTabs({ activeHref = "/owner" }) {
  return (
    <nav className="owner-page-tabs" aria-label="Owner dashboard sections">
      {OWNER_TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={tab.href === activeHref ? "owner-page-tab active" : "owner-page-tab"}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}