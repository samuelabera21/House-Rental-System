"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NewListingClient from "../../new-listing/NewListingClient";

export default function EditListingPage() {
  const params = useParams();
  const [listingId, setListingId] = useState(null);

  useEffect(() => {
    if (params?.listingId) {
      setListingId(params.listingId);
    }
  }, [params?.listingId]);

  if (!listingId) {
    return (
      <section className="section-block owner-section">
        <div className="page-container">
          <p>Loading listing...</p>
        </div>
      </section>
    );
  }

  return <NewListingClient listingId={listingId} />;
}